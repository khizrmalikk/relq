"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WavyBall } from "@/components/WavyBall";
import { RetellWebClient } from "retell-client-js-sdk";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const webClient = new RetellWebClient();

interface DemoCallProps {
  onStartCallAction: (scenario: string) => void;
  onEndCallAction: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

export function DemoCall({ onStartCallAction, onEndCallAction }: DemoCallProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Set up speaking event handlers
  useEffect(() => {
    const handleStartTalking = () => {
      console.log("agent_start_talking");
      setIsSpeaking(true);
    };

    const handleStopTalking = () => {
      console.log("agent_stop_talking");
      setIsSpeaking(false);
    };

    if (isCallActive) {
      webClient.on("agent_start_talking", handleStartTalking);
      webClient.on("agent_stop_talking", handleStopTalking);
    }

    return () => {
      webClient.off("agent_start_talking", handleStartTalking);
      webClient.off("agent_stop_talking", handleStopTalking);
    };
  }, [isCallActive]);

  const startConversation = async (scenario: string) => {
    setIsLoading(true);
    try {
      if (!navigator.onLine) {
        throw new Error("No internet connection");
      }

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: "agent_fcc1d85e1d0266586da2539520",
          scenario: scenario, // Pass scenario to backend if needed
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const data = await response.json();
      await webClient.startCall({
        accessToken: data.access_token,
      });

      setIsCallActive(true);
      setActiveScenario(scenario);
      onStartCallAction(scenario);
    } catch (error) {
      console.error("Error starting conversation:", error);
      setIsCallActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  const stopConversation = async () => {
    setIsLoading(true);
    try {
      await webClient.stopCall();
      setIsCallActive(false);
      setActiveScenario(null);
      onEndCallAction();
    } catch (error) {
      console.error("Error stopping conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDemo = (scenario: string) => {
    setSelectedScenario(scenario);
    setShowForm(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setShowForm(false);
    if (selectedScenario) {
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
              <Button type="submit" className="w-full bg-primary text-white">Start Demo</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-6xl text-white">
                Experience the Future
              </h2>
              <p className="text-xl text-gray-300 max-w-[600px]">
                Choose a demo scenario to see how our AI adapts to different real estate situations and client needs.
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
                    className="border-white text-white hover:bg-white hover:text-primary transition-colors w-full max-w-md rounded-full font-bold"
                  >
                    Multilingual Demo
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleStartDemo("first-time")}
                    disabled={isLoading}
                    className="border-white text-white hover:bg-white hover:text-primary transition-colors w-full max-w-md rounded-full font-bold"
                  >
                    General Demo
                  </Button>
                  {/* <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleStartDemo("investment")}
                    disabled={isLoading}
                    className="border-white text-white hover:bg-white hover:text-primary transition-colors w-full max-w-md rounded-full font-bold"
                  >
                    Investment Property Demo
                  </Button> */}
                </>
              ) : (
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={stopConversation}
                  disabled={isLoading}
                  className="w-full max-w-md"
                >
                  End Call
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <WavyBall
            size={200}
            isCalling={isCallActive}
            isLoading={isLoading}
            isSpeaking={isSpeaking}
            onClick={() => isCallActive ? stopConversation() : handleStartDemo("default")}
            className="cursor-pointer"
            blur={1}
            waveOpacity={0.6}
            speed="fast"
          />
        </div>
      </div>
    </>
  );
} 