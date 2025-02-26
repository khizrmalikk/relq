"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";

import CallAnalysis from "@/components/CallAnalysis";
import FeedbackForm from "@/components/FeedbackForm";
import { Button } from "@/components/ui/button";
import { WavyBall } from "@/components/WavyBall";

interface CallResult {
  summary: string;
  qualification: "cold" | "warm" | "hot";
  analysis: {
    key_points: string[];
    recommendations: string[];
  };
}

const webClient = new RetellWebClient();

const DemoPage = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callResult, setCallResult] = useState<CallResult | null>(null);
  const [demoCredits, setDemoCredits] = useState(2);
  const [showFeedback, setShowFeedback] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);

  useEffect(() => {
    // Load demo credits from localStorage or your backend
    const loadDemoCredits = async () => {
      // Implementation here
    };
    loadDemoCredits();
  }, []);

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

    // Add event listeners when call is active
    if (isCallActive) {
      webClient.on("agent_start_talking", handleStartTalking);
      webClient.on("agent_stop_talking", handleStopTalking);
    }

    // Cleanup function to remove event listeners
    return () => {
      webClient.off("agent_start_talking", handleStartTalking);
      webClient.off("agent_stop_talking", handleStopTalking);
    };
  }, [isCallActive]);

  const toggleConversation = async () => {
    if (isCallActive) {
      setIsLoading(true);
      try {
        await webClient.stopCall();
        setIsCallActive(false);
      } catch (error) {
        console.error("Error stopping conversation:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
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
      } catch (error) {
        console.error("Error starting conversation:", error);
        setIsCallActive(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto p-6 min-h-screen flex justify-center">
      <div className="max-w-5xl w-full">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          {/* Demo Credits Indicator */}
          <div className="text-right">
            <span className="gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md">
              Demo Credits: {demoCredits}
            </span>
          </div>
        </div>

        {/* Main Demo Section */}
        <div className="space-y-8">
          {!showFeedback ? (
            <>
              {/* Replace AudioVisualizer with WavyBall */}
              <div className="relative h-[300px]">
                {isLoading ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-primary text-lg font-bold whitespace-nowrap">
                    Ringing...
                  </div>
                ) : !isCallActive ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-primary text-lg font-bold whitespace-nowrap">
                    Start Call
                  </div>
                ) : (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-primary text-lg font-bold whitespace-nowrap">
                    End Call
                  </div>
                )}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <WavyBall
                    size={200}
                    isCalling={isCallActive}
                    isLoading={isLoading}
                    isSpeaking={isSpeaking}
                    onClick={toggleConversation}
                    className="cursor-pointer"
                    blur={1}
                    waveOpacity={0.6}
                    speed="fast"
                    colors={[
                      "#111111", // Darkest gray
                      "#333333", // Dark gray
                      "#666666", // Medium gray
                      "#999999", // Light gray
                      "#ffffff", // Glow color
                    ]}
                  />
                </div>
              </div>

              {/* Demo Instructions */}
              <div className="prose text-secondary-foreground space-y-4">
                <h2 className="text-primary font-bold text-5xl">
                  Lead Qualification AI Demo
                </h2>
                <p>
                  Experience our AI-powered lead qualification system. This demo
                  allows you to interact with our AI agent as if you were a
                  potential lead. The AI will analyze the conversation and
                  provide insights about lead qualification.
                </p>
                <h3 className="text-primary font-bold text-2xl">
                  How to Use the Demo:
                </h3>
                <ol className="list-decimal list-inside">
                  <li>Click the &quot;Start Call&quot; button below</li>
                  <li>
                    Pretend to be a potential customer interested in our product
                  </li>
                  <li>Interact naturally with our AI agent</li>
                  <li>Receive a detailed analysis of the conversation</li>
                </ol>
              </div>

              {/* Call Analysis Section */}
              {isLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4">Analyzing call...</p>
                </div>
              ) : (
                callResult && (
                  <CallAnalysis
                    result={callResult}
                    onComplete={() => setShowFeedback(true)}
                  />
                )
              )}
            </>
          ) : (
            <FeedbackForm userEmail={""} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
