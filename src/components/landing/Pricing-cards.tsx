"use client"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingCards() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
                    <p className="text-white">Choose the plan that&apos;s right for you or your agency</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Free Plan */}
                    <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                        <CardHeader className="flex flex-col space-y-1.5">
                            <CardTitle className="text-2xl">Free</CardTitle>
                            <CardDescription className="group-hover:text-primary-foreground/80">
                                Perfect for getting started
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-6">
                                <span className="text-4xl font-bold">0</span>
                                <span className="text-muted-foreground group-hover:text-primary-foreground/80"> AED/month</span>
                            </div>
                            <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                Try our AI calling service with basic features.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>5 calls per month</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>4 minutes per call</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>Fixed AI agent</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full group-hover:bg-primary-foreground group-hover:text-primary">
                                Get Started
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Agent Plan */}
                    <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                        <CardHeader className="flex flex-col space-y-1.5">
                            <CardTitle className="text-2xl">Agent</CardTitle>
                            <CardDescription className="group-hover:text-primary-foreground/80">
                                For individual agents
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-6">
                                <span className="text-4xl font-bold">499</span>
                                <span className="text-muted-foreground group-hover:text-primary-foreground/80"> AED/month</span>
                            </div>
                            <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                Unlimited calls within your daily time limit.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>30 minutes per day</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>Unlimited calls</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>Choose your AI agent</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full group-hover:bg-primary-foreground group-hover:text-primary">
                                Choose Plan
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Agency Plan */}
                    <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                        <CardHeader className="flex flex-col space-y-1.5">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl">Agency</CardTitle>
                                <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Popular</span>
                            </div>
                            <CardDescription className="group-hover:text-primary-foreground/80">
                                For growing agencies
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-6">
                                <span className="text-4xl font-bold">799</span>
                                <span className="text-muted-foreground group-hover:text-primary-foreground/80"> AED/month</span>
                            </div>
                            <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                More calling time for your team.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>1 hour per day</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>Unlimited calls</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>Choose your AI agent</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full group-hover:bg-primary-foreground group-hover:text-primary">
                                Choose Plan
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                        <CardHeader className="flex flex-col space-y-1.5">
                            <CardTitle className="text-2xl">Enterprise</CardTitle>
                            <CardDescription className="group-hover:text-primary-foreground/80">
                                For large agencies
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="mb-6">
                                <span className="text-4xl font-bold">1,499</span>
                                <span className="text-muted-foreground group-hover:text-primary-foreground/80"> AED/month</span>
                            </div>
                            <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                Maximum calling time for your team.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>2 hours per day</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>Unlimited calls</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                    <span>Choose your AI agent</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full group-hover:bg-primary-foreground group-hover:text-primary">
                                Choose Plan
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

