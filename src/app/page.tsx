"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building,
  MessageSquare,
  BarChart3,
  Clock,
  Database,
  Bot,
  Upload,
  LineChart,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Meteors } from "@/components/ui/meteors";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { WavyBall } from "@/components/WavyBall";
import { DemoCall } from "@/components/DemoCall";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { SiteFooter } from "@/components/footer";
import { FlipWords } from "@/components/ui/flip-words";
import { Timeline } from "@/components/ui/timeline";

export default function LandingPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const products = [
    {
      title: "Rhea",
      link: "#demo",
      thumbnail:
        "/avatars/arab.webp",
    },
    {
      title: "Tish",
      link: "#demo",
      thumbnail:
        "/avatars/brown.webp",
    },
    {
      title: "Ali",
      link: "#demo",
      thumbnail:
        "/avatars/arabman.webp",
    },
    {
      title: "James",
      link: "#demo",
      thumbnail:
        "/avatars/man.webp",
    },

    {
      title: "Kayla",
      link: "#demo",
      thumbnail:
        "/avatars/blonde.webp",
    },

    // Add more properties to fill out the rows (15 total recommended)
    // ... more properties ...
  ];

  const testimonials = [
    {
      quote: "I couldn't believe how much time we saved. This tool is a game-changer for real estate agents!",
      name: "Sarah Johnson",
      designation: "Real Estate Agent",
      src: "/avatars/blonde.webp" // Make sure to add actual image paths
    },
    {
      quote: "The AI-powered calls have dramatically improved our lead response time and conversion rates.",
      name: "Michael Chen",
      designation: "Real Estate Agent",
      src: "/avatars/arabman.webp"
    },
    {
      quote: "This platform has revolutionized how we handle incoming leads. It's like having a 24/7 sales team.",
      name: "Emma Rodriguez",
      designation: "Agency Owner",
      src: "/avatars/arab.webp"
    }
  ];

  const timelineData = [
    {
      title: "Step 1",
      content: (
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Upload Leads</h4>
          <p className="text-neutral-600 dark:text-neutral-400">Get started by uploading your leads through a simple CSV file or sync directly with your CRM system.</p>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">AI Qualification</h4>
          <p className="text-neutral-600 dark:text-neutral-400">Our AI system automatically calls and qualifies your leads, saving you time and resources.</p>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Access Insights</h4>
          <p className="text-neutral-600 dark:text-neutral-400">Review detailed data insights and focus your attention on warm, qualified leads ready for follow-up.</p>
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Engage Leads</h4>
          <p className="text-neutral-600 dark:text-neutral-400">Our AI agent calls new leads as soon as they come in, ensuring no opportunity is missed.</p>
        </div>
      ),
    },
    {
      title: "Step 5",
      content: (
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Personalized Conversations</h4>
          <p className="text-neutral-600 dark:text-neutral-400">With an always-updated knowledge base of your listings and property data, the AI delivers tailored recommendations to potential clients.</p>
        </div>
      ),
    },
    {
      title: "Step 6",
      content: (
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Actionable Insights</h4>
          <p className="text-neutral-600 dark:text-neutral-400">Gain valuable data on lead preferences and readiness, giving your team the upper hand.</p>
        </div>
      ),
    },
  ];

  const keyFeatures = [
    {
      title: "AI-Powered Lead Response",
      description: "Instant, intelligent engagement with every new lead, 24/7, ensuring no opportunity is missed.",
      icon: <Bot className="w-6 h-6 text-neutral-600 dark:text-neutral-200" />,
      className: "md:col-span-2"
    },
    {
      title: "Real-Time Analytics",
      description: "Track and analyze lead engagement metrics and conversion rates in real-time.",
      icon: <BarChart3 className="w-6 h-6 text-neutral-600 dark:text-neutral-200" />,
    },
    {
      title: "Property Database",
      description: "Maintain an always-updated database of your listings for accurate recommendations.",
      icon: <Database className="w-6 h-6 text-neutral-600 dark:text-neutral-200" />,
    },
    {
      title: "24/7 Availability",
      description: "Never miss a lead with round-the-clock automated response system.",
      icon: <Clock className="w-6 h-6 text-neutral-600 dark:text-neutral-200" />,
    },
    // {
    //   title: "Pre-built and customizable call flows",
    //   description: "Choose from a variety of pre-built call flows or create your own to suit your business needs.",
    //   icon: <Pencil className="w-6 h-6 text-neutral-600 dark:text-neutral-200" />,
    // },
    {
      title: "CRM & Database integration",
      description: "Sync your leads and listings with your CRM or database for seamless integration.",
      icon: <Database className="w-6 h-6 text-neutral-600 dark:text-neutral-200" />,
    },
  ];

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDialogOpen(true);
  };

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
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 flex items-center fixed top-0 left-0 right-0 z-50 backdrop-blur-md pt-5 pb-5">
        <Link className="flex items-center justify-center" href="#">
          <span className="ml-2 text-2xl font-bold text-white">RELQ.AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-white"
            href="#features"
          >
            Features
          </Link>
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
        </nav>
        <div className="flex gap-4 ml-auto">
          <button className="px-6 py-2 rounded-full tracking-widest uppercase font-bold bg-primary text-white hover:bg-white hover:text-primary transition duration-200 ml-auto border-none">
            Try for Free
          </button>
          <button className="text-white border border-white px-6 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-white hover:text-primary transition duration-200 ml-auto">
            Login
          </button>
        </div>
      </header>
      <main className="flex-1">
        <HeroParallax products={products} />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
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
                className="text-4xl font-bold text-primary"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background" id="how-it-works">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <Timeline data={timelineData} />
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
          id="demo"
        >
          <div className="container mx-auto px-4 md:px-6">
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          </div>
        </section>
      </main>
      <SiteFooter />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Enter your email to continue
            </DialogTitle>
            <DialogDescription className="text-muted">
              Please provide your email address to access the demo. We&apos;ll keep
              you updated with our latest features.
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
