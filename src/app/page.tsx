"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { DemoCall } from "@/components/landing/DemoCall";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SiteFooter } from "@/components/landing/footer";
import { FlipWords } from "@/components/ui/flip-words";
import { Timeline } from "@/components/ui/timeline";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import PricingCards from "@/components/landing/Pricing-cards";
import ProductInterestForm from "@/components/landing/Product-interest-form";
import posthog from 'posthog-js';

export default function LandingPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Add test event on component mount
  useEffect(() => {
    posthog.capture('landing_page_viewed', {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  }, []);

  const testimonials = [
    {
      quote: "I deliver rapid, clear communication with a disciplined dialogue structure, specializing in client needs analysis and efficient property matching.",
      name: "Sarah Lee",
      designation: "Real Estate Agent (English Speaker – Female)",
      src: "/avatars/blonde.webp" // Assuming this image works for Sarah Lee
    },
    {
      quote: "I provide quick and structured responses following a strict conversation flow, with expertise in property listings and market trends.",
      name: "Michael Chen",
      designation: "Real Estate Agent (English Speaker – Male)",
      src: "/avatars/man.webp" // Keeping existing image for Michael
    },
    {
      quote: "I offer fast, streamlined conversational flow tailored to client inquiries, with deep knowledge of regional property markets and bilingual support.",
      name: "Amir Haddad",
      designation: "Real Estate Agent (Arabic Speaker – Male)",
      src: "/avatars/arabman.webp" // Repurposing existing image for Amir
    },
    {
      quote: "I provide quick, precise responses with a strict conversational framework and expertise in local real estate dynamics with culturally tuned communication.",
      name: "Leila Mansour",
      designation: "Real Estate Agent (Arabic Speaker – Female)",
      src: "/avatars/arab.webp" // You may want to add a new image for Leila
    },
    {
      quote: "I can dynamically switch between languages to suit client preferences, offering a personalized, flexible approach beyond strict conversational flows.",
      name: "Elena Rodriguez",
      designation: "Premium Real Estate Agent (Dynamic Multilingual – Female)",
      src: "/avatars/brown.webp" // You may want to add a new image for Elena
    }
  ];

  const timelineData = [
    {
      title: "Step 1",
      content: (
        <div className="space-y-2">
          <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Upload Your Leads</h4>
          <p className="text-neutral-600 dark:text-white">
            <strong>How It Works:</strong> Users upload a .CSV file with cold leads or sync their CRM with QAULI.
          </p>
          <p className="text-neutral-600 dark:text-white">
            <strong>What Happens Next:</strong> The leads are stored securely, ready for AI-powered outreach.
          </p>
          {/* <p className="text-neutral-600 dark:text-white">
            <strong>Visual:</strong> Upload button & CRM logos (HubSpot, Salesforce, etc.).
          </p> */}
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div className="space-y-2">
          <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">AI Agent Makes Calls</h4>
          <p className="text-neutral-600 dark:text-white">
            <strong>How It Works:</strong> QAULI&apos;s AI calls leads, following a tailored script based on real estate needs.
          </p>
          <p className="text-neutral-600 dark:text-white">
            <strong>What Happens Next:</strong> The AI engages with leads, asking key questions about their property preferences, budget, and intent.
          </p>
          {/* <p className="text-neutral-600 dark:text-white">
            <strong>Visual:</strong> Animated AI phone call graphic with speech bubbles.
          </p> */}
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div className="space-y-2">
          <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">AI Qualifies the Lead</h4>
          <p className="text-neutral-600 dark:text-white">
            <strong>How It Works:</strong> The AI evaluates lead responses, determining whether they are warm leads or cold leads based on set criteria.
          </p>
          <p className="text-neutral-600 dark:text-white">
            <strong>What Happens Next:</strong> QAULI categorizes leads into qualified or unqualified groups for easy follow-up.
          </p>
          {/* <p className="text-neutral-600 dark:text-white">
            <strong>Visual:</strong> Lead funnel graphic (Cold Leads → AI Call → Warm Leads).
          </p> */}
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div className="space-y-2">
          <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Data & Insights are Collected</h4>
          <p className="text-neutral-600 dark:text-white">
            <strong>How It Works:</strong> The AI records key details from the call, such as budget range, location preference, and urgency level.
          </p>
          <p className="text-neutral-600 dark:text-white">
            <strong>What Happens Next:</strong> QAULI compiles a summary for each lead with actionable insights.
          </p>
          {/* <p className="text-neutral-600 dark:text-white">
            <strong>Visual:</strong> Dashboard preview showing lead data (price range, location, lead score).
          </p> */}
        </div>
      ),
    },
    {
      title: "Step 5",
      content: (
        <div className="space-y-2 mb-40">
          <h4 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">Sync with Your CRM & Take Action</h4>
          <p className="text-neutral-600 dark:text-white">
            <strong>How It Works:</strong> All data is automatically pushed to your CRM, ready for the sales team.
          </p>
          <p className="text-neutral-600 dark:text-white">
            <strong>What Happens Next:</strong> Agents can view insights, prioritize leads, and schedule warm follow-ups to close deals faster.
          </p>
          {/* <p className="text-neutral-600 dark:text-white">
            <strong>Visual:</strong> CRM interface with lead scores and call summaries.
          </p> */}
        </div>
      ),
    },
  ];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the email submission
    setDialogOpen(false);
    router.push("/demo");
  };

  const handleStartCall = (scenario: string) => {
    console.log(`Starting call for scenario: ${scenario}`);
  };

  const handleEndCall = () => {
    console.log("Call ended");
  };

  return (
    <div className="flex flex-col">
      <header className="px-4 lg:px-6 flex flex-wrap items-center justify-between fixed top-0 left-0 right-0 z-50 backdrop-blur-md pt-5 pb-5">
        <Link className="flex items-center justify-center" href="#">
          <span className="ml-2 text-2xl md:text-3xl font-bold text-primary">QAULI</span>
        </Link>

        {/* Mobile Try for Free button */}
        <div className="block md:hidden">
          <Link href="#demo" className="px-4 py-2 rounded-md tracking-widest uppercase text-sm font-bold bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition duration-200 border-none">
            Try for Free
          </Link>
        </div>

        {/* Navigation and buttons container */}
        <div className="hidden md:flex w-full md:w-auto md:ml-auto items-center flex-col md:flex-row gap-4">
          <nav className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full md:w-auto">

            <Link
              className="text-sm font-medium hover:underline underline-offset-4 text-white"
              href="#how-it-works"
            >
              How It Works
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4 text-white"
              href="#demo"
            >
              Demo
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4 text-white"
              href="#pricing"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Link href="#demo" className="px-4 md:px-6 py-2 rounded-md tracking-widest uppercase text-sm font-bold bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition duration-200 border-none">
              Try for Free
            </Link>
            <button disabled className="text-white border border-white px-4 md:px-6 py-2 rounded-md tracking-widest uppercase text-sm font-bold bg-transparent hover:bg-primary hover:text-primary-foreground transition duration-200">
              Login
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <BackgroundGradientAnimation interactive={true} className="w-full">
          <section className="flex flex-col justify-center p-4 min-h-screen bg-transparent">

            <div className="flex flex-col p-4 z-10 sm:ml-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
                Transform Your Real Estate Business with
              </h2>
              <FlipWords
                words={[
                  "AI-Powered Lead Response",
                  "24/7 Lead Qualification",
                  "Smart Property Recommendations",
                  "Automated Follow-ups",
                  "Real-time Analytics"
                ]}
                duration={3000}
                className="text-4xl font-bold text-primary mb-4"
              />
              <p className="text-xl md:text-xl text-white/80 max-w-3xl mb-8">
                AI-powered lead qualification for real estate professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#demo" className="text-white text-center border border-white px-6 py-3 rounded-md tracking-widest uppercase text-sm font-bold bg-transparent hover:bg-primary hover:text-primary-foreground transition duration-200">
                  Try Demo
                </Link>
              </div>
            </div>
          </section>

          <section className="w-full bg-transparent">
            <div className="container mx-auto px-4 md:px-6">

              <InfiniteMovingCards
                items={[
                  {
                    quote: "AI-powered lead qualification",
                    name: "Feature 1",
                    title: "Automatically qualify leads 24/7",
                    image: "/avatars/blonde.webp"
                  },
                  {
                    quote: "Smart property recommendations",
                    name: "Feature 2",
                    title: "Match clients with perfect properties",
                    image: "/avatars/arabman.webp"
                  },
                  {
                    quote: "Automated follow-ups",
                    name: "Feature 3",
                    title: "Never miss a potential client",
                    image: "/avatars/man.webp"
                  },
                  {
                    quote: "Real-time analytics",
                    name: "Feature 4",
                    title: "Make data-driven decisions",
                    image: "/avatars/brown.webp"
                  },
                  {
                    quote: "CRM integration",
                    name: "Feature 5",
                    title: "Seamless workflow with your existing tools",
                    image: "/avatars/arab.webp"
                  },
                ]}
                direction="left"
                speed="normal"
                pauseOnHover={true}
                className="py-4"
              />
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent" id="how-it-works">
            <div className="container mx-auto px-4 md:px-6 bg-black/50 z-10 p-8 rounded-lg">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-white">
                How It Works
              </h2>
              <Timeline data={timelineData} />
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent" id="demo">
            <div className="container mx-auto px-4 md:px-6 bg-transparent p-8 rounded-lg">
              <DemoCall onStartCallAction={handleStartCall} onEndCallAction={handleEndCall} />
            </div>
          </section>
          {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-background" id="features">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
              {keyFeatures.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  className={item.className}
                />
              ))}
            </BentoGrid>
          </div>
        </section> */}
          <section className="w-full bg-transparent">
            <div className="container mx-auto px-4 md:px-6 bg-black/50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-white">Our Agents</h2>
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
          </section>
          <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
            <PricingCards />
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6 bg-black/50 p-8 rounded-lg">
              <ProductInterestForm />
            </div>
          </section>
        </BackgroundGradientAnimation>
      </main>
      <SiteFooter />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Enter your email to continue
            </DialogTitle>
            <DialogDescription className="text-muted">
              Please provide your email address to access the demo. We&apos;ll help you qualify leads...
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background text-foreground placeholder:text-[#5C6A6D]"
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue to Demo
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
