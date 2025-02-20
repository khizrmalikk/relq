"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, MessageSquare, BarChart3, Clock, Database, Bot } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Meteors } from "@/components/ui/meteors"

export default function LandingPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you can handle the email submission
    setDialogOpen(false)
    router.push('/demo')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-primary">
        <Link className="flex items-center justify-center" href="#">
          <Building className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold text-white">AIRealty</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-white" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-white" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4 text-white" href="#demo">
            Demo
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Revolutionize Real Estate Lead Qualification with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Empower your agency with smarter, faster, and more personalized lead management – designed
                  specifically for real estate professionals.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-background/90 text-foreground placeholder:text-[#5C6A6D]" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/10" id="features">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-black">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-b from-primary/20 to-primary/10 p-8">
                <Meteors number={10} className="!opacity-[0.3]" />
                <div className="flex flex-col items-center space-y-3 text-center relative z-10">
                  <Clock className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-black">Real-Time Lead Engagement</h3>
                  <p className="text-gray-500 dark:text-gray-400">Every inquiry gets an immediate response.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-b from-primary/20 to-primary/10 p-8">
                <Meteors number={10} className="!opacity-[0.3]" />
                <div className="flex flex-col items-center space-y-3 text-center relative z-10">
                  <Database className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-black">Dynamic Knowledge Base</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Automatically sync your property listings for accurate recommendations.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-border/40 bg-gradient-to-b from-primary/20 to-primary/10 p-8">
                <Meteors number={10} className="!opacity-[0.3]" />
                <div className="flex flex-col items-center space-y-3 text-center relative z-10">
                  <Bot className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-black">AI-Driven Efficiency</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Focus on closing deals while the AI handles initial conversations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="how-it-works">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <MessageSquare className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Engage Leads Instantly</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI agent calls new leads as soon as they come in, ensuring no opportunity is missed.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Building className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Personalized Conversations</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  With an always-updated knowledge base of your listings and property data, the AI delivers tailored
                  recommendations to potential clients.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <BarChart3 className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Actionable Insights</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Gain valuable data on lead preferences and readiness, giving your team the upper hand.
                </p>
              </div>
            </div>
            <div className="mt-12 aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${new URL('https://www.youtube.com/watch?v=2RfsK4AgMOo').searchParams.get('v')}`}
                title="How AIRealty Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/10" id="demo">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black">Try it for Yourself!</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  See the power of AI in action. Explore a fictional neighborhood. Chat with our AI agent. Discover how
                  it qualifies leads and suggests properties.
                </p>
              </div>
              <Link href="/demo" onClick={handleDemoClick}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border-none">
                  Start Demo Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Be Among the First to Experience the Future of Real Estate
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                  Sign up now for early access, updates, and exclusive features.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-background/90 text-foreground placeholder:text-[#5C6A6D]" placeholder="Enter your email" type="email" />
                  <Button type="submit" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Register Your Interest
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <blockquote className="mx-auto max-w-[800px] text-center italic text-muted md:text-2xl">
              "I couldn't believe how much time we saved. This tool is a game-changer for real estate agents!"
              <footer className="mt-4 text-sm font-semibold">– Beta Tester</footer>
            </blockquote>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
        <p className="text-xs text-muted">© 2023 AIRealty. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
        </nav>
        <p className="text-xs text-muted">Contact: support@airealty.com</p>
      </footer>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="text-foreground">Enter your email to continue</DialogTitle>
            <DialogDescription className="text-muted">
              Please provide your email address to access the demo. We'll keep you updated with our latest features.
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
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Continue to Demo
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

