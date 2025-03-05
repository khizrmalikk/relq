"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingCards() {
    const [selectedTab, setSelectedTab] = useState("monthly")

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
                    <p className="text-muted-foreground">Choose the plan that&apos;s right for you or your agency</p>
                </div>

                <Tabs defaultValue="monthly" className="space-y-8" onValueChange={setSelectedTab}>
                    <div className="flex justify-center">
                        <TabsList className="grid w-64 grid-cols-2">
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="onthego">On the Go</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="monthly" className="space-y-4">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Agent for Agents Card */}
                            <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                                <CardHeader className="flex flex-col space-y-1.5">
                                    <CardTitle className="text-2xl">Agent for Agents</CardTitle>
                                    <CardDescription className="group-hover:text-primary-foreground/80">
                                        Perfect for individual professionals
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">$29</span>
                                        <span className="text-muted-foreground group-hover:text-primary-foreground/80">/month</span>
                                    </div>
                                    <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                        Ideal for individuals making up to 50 calls per day.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Up to 50 calls per day</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Basic analytics</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Email support</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>1 user account</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full group-hover:bg-primary-foreground group-hover:text-primary">
                                        Choose Plan
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Agent for Agencies Card */}
                            <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                                <CardHeader className="flex flex-col space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl">Agent for Agencies</CardTitle>
                                        <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Popular</span>
                                    </div>
                                    <CardDescription className="group-hover:text-primary-foreground/80">
                                        Designed for growing agencies
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">$99</span>
                                        <span className="text-muted-foreground group-hover:text-primary-foreground/80">/month</span>
                                    </div>
                                    <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                        Perfect for agencies making up to 500 calls per day.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Up to 500 calls per day</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Advanced analytics dashboard</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Priority support</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>5 user accounts</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Custom integrations</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full group-hover:bg-primary-foreground group-hover:text-primary"
                                        variant="default"
                                    >
                                        Choose Plan
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="onthego" className="space-y-4">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Pay-per-minute with Agent for Agents */}
                            <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                                <CardHeader className="flex flex-col space-y-1.5">
                                    <CardTitle className="text-2xl">Basic Agent</CardTitle>
                                    <CardDescription className="group-hover:text-primary-foreground/80">
                                        Pay only for what you use
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">$0.05</span>
                                        <span className="text-muted-foreground group-hover:text-primary-foreground/80">/minute</span>
                                    </div>
                                    <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                        Perfect for occasional use with no commitments.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Pay as you go</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Basic features</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Email support</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>No monthly commitment</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full group-hover:bg-primary-foreground group-hover:text-primary">
                                        Choose Plan
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Pay-per-minute with Agent for Agencies */}
                            <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                                <CardHeader className="flex flex-col space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl">Premium Agent</CardTitle>
                                        <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                                            Best Value
                                        </span>
                                    </div>
                                    <CardDescription className="group-hover:text-primary-foreground/80">
                                        Advanced features, pay as you go
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">$0.08</span>
                                        <span className="text-muted-foreground group-hover:text-primary-foreground/80">/minute</span>
                                    </div>
                                    <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                        Premium features with pay-as-you-go flexibility.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Pay as you go</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Advanced AI capabilities</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Priority support</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Usage analytics</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Volume discounts available</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full group-hover:bg-primary-foreground group-hover:text-primary"
                                        variant="default"
                                    >
                                        Choose Plan
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

