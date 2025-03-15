"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingCards() {

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
                    <p className="text-white">Choose the plan that&apos;s right for you or your agency</p>
                </div>

                <Tabs defaultValue="monthly" className="space-y-8">
                    <div className="flex justify-center">
                        <TabsList className="grid w-64 grid-cols-2">
                            <TabsTrigger value="monthly">For Agents</TabsTrigger>
                            <TabsTrigger value="onthego">For Agencies</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="monthly" className="space-y-4">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Basic Plan for Individual Agents */}
                            <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                                <CardHeader className="flex flex-col space-y-1.5">
                                    <CardTitle className="text-2xl">Basic Agent Plan</CardTitle>
                                    <CardDescription className="group-hover:text-primary-foreground/80">
                                        Essential calling for individual agents
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">299</span>
                                        <span className="text-muted-foreground group-hover:text-primary-foreground/80"> AED/month</span>
                                    </div>
                                    <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                        1 hour of AI-powered calls per month for individual real estate agents.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>1 hour of calls per month</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Basic lead qualification</span>
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

                            {/* Premium Plan for Individual Agents */}
                            <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                                <CardHeader className="flex flex-col space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl">Premium Agent Plan</CardTitle>
                                        <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Popular</span>
                                    </div>
                                    <CardDescription className="group-hover:text-primary-foreground/80">
                                        Enhanced calling for serious agents
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">499</span>
                                        <span className="text-muted-foreground group-hover:text-primary-foreground/80"> AED/month</span>
                                    </div>
                                    <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                        2 hours of AI-powered calls per month for ambitious real estate agents.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>2 hours of calls per month</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Advanced lead qualification</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Priority support</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Detailed call analytics</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>CRM integration</span>
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
                            {/* Basic Plan for Agencies */}
                            <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                                <CardHeader className="flex flex-col space-y-1.5">
                                    <CardTitle className="text-2xl">Basic Agency Plan</CardTitle>
                                    <CardDescription className="group-hover:text-primary-foreground/80">
                                        Essential calling for your entire team
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">1,249</span>
                                        <span className="text-muted-foreground group-hover:text-primary-foreground/80"> AED/month</span>
                                    </div>
                                    <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                        1 hour of AI-powered calls per month for agencies with 8-12 agents.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>1 hour of calls per month per agent</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Supports 8-12 agent accounts</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Team analytics dashboard</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Email & chat support</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full group-hover:bg-primary-foreground group-hover:text-primary">
                                        Choose Plan
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Premium Plan for Agencies */}
                            <Card className="flex flex-col group transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                                <CardHeader className="flex flex-col space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl">Premium Agency Plan</CardTitle>
                                        <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                                            Best Value
                                        </span>
                                    </div>
                                    <CardDescription className="group-hover:text-primary-foreground/80">
                                        Enhanced calling for high-performance agencies
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">2,299</span>
                                        <span className="text-muted-foreground group-hover:text-primary-foreground/80"> AED/month</span>
                                    </div>
                                    <p className="mb-4 text-muted-foreground group-hover:text-primary-foreground/80">
                                        2 hours of AI-powered calls per month for agencies with 8-12 agents.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>2 hours of calls per month per agent</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Supports 8-12 agent accounts</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Advanced team analytics</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>Priority support with dedicated manager</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                                            <span>CRM & property management integrations</span>
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

