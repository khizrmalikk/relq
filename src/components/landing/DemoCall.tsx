"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { WavyBall } from "@/components/landing/AudioVisual/WavyBall";
import { RetellWebClient } from "retell-client-js-sdk";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload, Clock, CheckCircle, XCircle, BarChart, Loader2 } from "lucide-react";
import { ProductInterestDialog } from "@/components/landing/ProductInterestDialog";
import { toast } from "sonner";
import posthog from 'posthog-js';

const webClient = new RetellWebClient();

interface DemoCallProps {
  onStartCallAction: (scenario: string) => void;
  onEndCallAction: () => void;
}

interface CallAnalysis {
  call_summary?: string;
  user_sentiment?: string;
  call_successful?: boolean;
  custom_analysis_data?: any;
  in_voicemail?: boolean;
}

interface CallResult {
  call_id?: string;
  call_analysis?: CallAnalysis;
  start_timestamp?: number;
  end_timestamp?: number;
  total_duration_seconds?: number;
  total_cost_dollars?: number;
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  listingsFile: z.any().optional(),
});

export function DemoCall({ onStartCallAction, onEndCallAction }: DemoCallProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [callResult, setCallResult] = useState<CallResult | null>(null);
  const [showCallResult, setShowCallResult] = useState(false);
  const [currentCallId, setCurrentCallId] = useState<string | null>(null);
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [isFetchingCallData, setIsFetchingCallData] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      listingsFile: undefined,
    },
  });

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const sendEmailSummary = async (callData: CallResult) => {
    setIsSendingEmail(true);
    try {
      const formValues = form.getValues();
      
      if (!formValues.email) {
        console.error('Cannot send email: Email address is missing');
        toast.error("Could not send email summary: Email address is missing");
        return;
      }
      
      console.log('Sending email summary to:', formValues.email);
      
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formValues.email,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          callSummary: callData.call_analysis?.call_summary,
          callDuration: callData.total_duration_seconds ? formatDuration(callData.total_duration_seconds) : undefined,
          callId: callData.call_id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorText = errorData ? JSON.stringify(errorData) : await response.text();
        console.error(`Error sending email (${response.status}):`, errorText);
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('Email sent successfully, ID:', responseData.id);
      toast.success("Call summary sent to your email");
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("We couldn't send your call summary email. Please check your email address.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const fetchCallData = async (callId: string): Promise<CallResult> => {
    try {
      const response = await fetch(`/api/call/${callId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch call data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching call data:', error);
      throw error;
    }
  };

  const handleEndCall = useCallback((message: string) => {
    setIsCallActive(false);
    onEndCallAction();
    
    // Track call completion
    posthog.capture('demo_call_completed', {
      call_id: currentCallId,
      message
    });
    
    toast.success(message);
    
    if (currentCallId) {
      setIsFetchingCallData(true);
      setTimeout(async () => {
        try {
          const callData = await fetchCallData(currentCallId);
          setCallResult(callData);
          setShowCallResult(true);
          
          // Send call summary email
          await sendEmailSummary(callData);
        } catch (error) {
          console.error('Error fetching call data:', error);
          toast.error('Failed to fetch call data');
        } finally {
          setIsFetchingCallData(false);
        }
      }, 2000);
    }
  }, [currentCallId, fetchCallData, onEndCallAction, sendEmailSummary]);

  useEffect(() => {
    const handleStartTalking = () => {
      console.log("agent_start_talking");
      setIsSpeaking(true);
    };

    const handleStopTalking = () => {
      console.log("agent_stop_talking");
      setIsSpeaking(false);
    };

    const handleCallEnd = () => {
      console.log("call_ended event received");
      if (isCallActive) {
        handleEndCall("Call ended by agent");
      }
    };

    if (isCallActive) {
      webClient.on("agent_start_talking", handleStartTalking);
      webClient.on("agent_stop_talking", handleStopTalking);
      webClient.on("call_ended", handleCallEnd);
    }

    return () => {
      webClient.off("agent_start_talking", handleStartTalking);
      webClient.off("agent_stop_talking", handleStopTalking);
      webClient.off("call_ended", handleCallEnd);
    };
  }, [isCallActive, handleEndCall]);

  const startConversation = async (scenario: string) => {
    setIsLoading(true);
    try {
      if (!navigator.onLine) {
        throw new Error("No internet connection");
      }

      // Track demo call start attempt
      posthog.capture('demo_call_started', {
        scenario,
        user_info: {
          first_name: form.getValues("firstName"),
          last_name: form.getValues("lastName"),
          email: form.getValues("email"),
          phone: form.getValues("phone"),
        }
      });

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: "agent_6dd5336ea9dfe8a90bdce9b4a9",
          scenario: scenario,
          vars: {
            first_name: form.getValues("firstName"),
            last_name: form.getValues("lastName"),
            email: form.getValues("email"),
            phone: form.getValues("phone"),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const data = await response.json();
      setCurrentCallId(data.call_id);
      
      await webClient.startCall({
        accessToken: data.access_token,
      });

      setIsCallActive(true);
      onStartCallAction(scenario);
      
      // Track successful call start
      posthog.capture('demo_call_connected', {
        call_id: data.call_id,
        scenario
      });
      
      toast.success("Call started successfully");
    } catch (error) {
      console.error("Error starting conversation:", error);
      setIsCallActive(false);
      
      // Track call start failure
      posthog.capture('demo_call_start_failed', {
        scenario,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      toast.error("Failed to start the call. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopConversation = async () => {
    setIsLoading(true);
    try {
      await webClient.stopCall();
      
      // Track manual call end
      posthog.capture('demo_call_ended_manual', {
        call_id: currentCallId
      });
      
      handleEndCall("Call ended successfully");
    } catch (error) {
      console.error("Error stopping conversation:", error);
      
      // Track call end error
      posthog.capture('demo_call_end_error', {
        call_id: currentCallId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      toast.error("There was an issue ending the call.");
      setIsCallActive(false);
      onEndCallAction();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCallResultClose = () => {
    setShowCallResult(false);
    setShowInterestDialog(true);
  };
  
  const handleInterestSubmit = async (data: any) => {
    try {
      if (data.marketingConsent || data.productInterest) {
        // Track user interest submission
        posthog.capture('demo_user_interest_submitted', {
          call_id: callResult?.call_id,
          marketing_consent: data.marketingConsent,
          product_interest: data.productInterest,
          interest_level: data.interestLevel,
          follow_up_preference: data.followUpPreference
        });

        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            callId: callResult?.call_id,
            callDuration: callResult?.total_duration_seconds,
            callSummary: callResult?.call_analysis?.call_summary,
            call_analysis: {
              user_sentiment: callResult?.call_analysis?.user_sentiment,
              call_successful: callResult?.call_analysis?.call_successful
            }
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error saving user data (${response.status}):`, errorText);
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        
        console.log('User data saved successfully');
        
        if (data.productInterest) {
          toast.success("Thanks for your interest! Our team will be in touch soon.");
        } else if (data.marketingConsent) {
          toast.success("Thanks! You've been added to our mailing list.");
        }
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      
      // Track user interest submission error
      posthog.capture('demo_user_interest_error', {
        call_id: callResult?.call_id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      toast.error("There was an error processing your request.");
    }
  };

  const handleStartDemo = (scenario: string) => {
    setSelectedScenario(scenario);
    setShowForm(true);
  };

  const validateFile = (file: File) => {
    if (!file) return true;

    if (!file.type.includes('csv')) {
      setFileError('Please upload a CSV file');
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size should be less than 5MB');
      return false;
    }

    setFileError(null);
    return true;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setShowForm(false);
    
    // Send welcome email first
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          productInterest: true,
          marketingConsent: true // Since they're doing a demo, we assume they want updates
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }
    } catch (error) {
      console.error('Error saving initial user data:', error);
      // Continue with the demo even if email fails
    }

    if (selectedScenario) {
      if (values.listingsFile) {
        console.log('File to upload:', values.listingsFile);
      }
      await startConversation(selectedScenario);
    }
  };

  return (
    <>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Play the role of a sourced lead</DialogTitle>
            <DialogDescription>
              Please enter your details to play the role of a sourced lead.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="listingsFile"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormLabel>Upload Listings - CSV (Optional)</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept=".csv"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && validateFile(file)) {
                              onChange(file);
                            }
                          }}
                          className="hidden"
                          id="listings-file"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById('listings-file')?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          {value ? value.name : 'Choose CSV File'}
                        </Button>
                      </div>
                    </FormControl>
                    {fileError && (
                      <p className="text-sm text-red-500 mt-1">{fileError}</p>
                    )}
                  </FormItem>
                )}
              /> */}
              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Start Demo
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showCallResult} onOpenChange={setShowCallResult}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Call Summary</DialogTitle>
            <DialogDescription>
              Here's an analysis of your recent conversation
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {isFetchingCallData && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Analyzing your call...</p>
              </div>
            )}
            
            {!isFetchingCallData && (
              <>
                {callResult?.total_duration_seconds && (
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Call Duration</h4>
                      <p>{formatDuration(callResult.total_duration_seconds)}</p>
                    </div>
                  </div>
                )}
                
                {callResult?.call_analysis?.call_successful !== undefined && (
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    {callResult.call_analysis.call_successful ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <h4 className="font-medium">Call Outcome</h4>
                      <p>{callResult.call_analysis.call_successful ? "Successful" : "Unsuccessful"}</p>
                    </div>
                  </div>
                )}
                
                {callResult?.call_analysis?.user_sentiment && (
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <BarChart className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Lead Sentiment</h4>
                      <p>{callResult.call_analysis.user_sentiment}</p>
                    </div>
                  </div>
                )}
                
                {callResult?.call_analysis?.call_summary && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Call Summary</h4>
                    <p className="text-sm">{callResult.call_analysis.call_summary}</p>
                  </div>
                )}
                
                {!callResult?.call_analysis?.call_summary && 
                 !callResult?.call_analysis?.user_sentiment && 
                 callResult?.call_analysis?.call_successful === undefined && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Call Completed</h4>
                    <p className="text-sm">
                      Your call has been completed successfully. The detailed analysis is not available at this time.
                      This might be because the call just ended and the analysis is still being processed.
                    </p>
                  </div>
                )}
                
                {isSendingEmail && (
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <p className="text-sm">Sending summary to your email...</p>
                  </div>
                )}
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleCallResultClose}
              className="w-full"
              disabled={isFetchingCallData || isSendingEmail}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ProductInterestDialog
        open={showInterestDialog}
        onOpenChange={setShowInterestDialog}
        userData={{
          firstName: form.getValues("firstName"),
          lastName: form.getValues("lastName"),
          email: form.getValues("email"),
          phone: form.getValues("phone"),
          callId: callResult?.call_id,
          callDuration: callResult?.total_duration_seconds,
          callSummary: callResult?.call_analysis?.call_summary
        }}
        onSubmit={handleInterestSubmit}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl text-white">
                Experience the Future of Real Estate
              </h2>
              <p className="text-xl text-gray-300 max-w-[600px]">
                Start a demo call to see how our AI adapts to different real estate situations and client needs.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              {!isCallActive ? (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleStartDemo("luxury")}
                    disabled={isLoading}
                    className="border-white text-white hover:bg-white hover:text-primary-foreground transition-colors w-full max-w-md font-bold bg-transparent"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing Demo...
                      </>
                    ) : (
                      "Start Demo"
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={stopConversation}
                  disabled={isLoading}
                  className="w-full max-w-md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Ending Call...
                    </>
                  ) : (
                    "End Call"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8 md:mt-0">
          <WavyBall
            size={200}
            isCalling={isCallActive}
            isLoading={isLoading}
            isSpeaking={isSpeaking}
            onClick={() => isCallActive ? stopConversation() : handleStartDemo("default")}
            className="cursor-pointer w-[150px] sm:w-[200px] h-[150px] sm:h-[200px]"
            blur={0}
            waveOpacity={1}
            speed="fast"
          />
        </div>
      </div>
    </>
  );
} 