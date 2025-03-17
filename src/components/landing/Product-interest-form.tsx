"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    feedback: z.string().optional(),
    notes: z.string().optional(),
})

export default function ProductInterestForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            feedback: "",
            notes: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        // Simulate API call
        try {
            // Replace with your actual form submission logic
            await new Promise((resolve) => setTimeout(resolve, 1000))

            console.log(values)
            toast.success("Form submitted successfully", {
                description: "Thank you for your interest in our product!",
            })
            form.reset()
        } catch (error) {
            toast.error("Something went wrong", {
                description: "Please try again later.",
            })
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto rounded-lg p-6 bg-transparent backdrop-blur-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">You Interested?</h2>
                <p className="text-muted-foreground">
                    Let us know you&apos;re interested in our product. We&apos;ll keep you updated on the latest news and releases.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
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
                                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Feedback (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Share your thoughts about our product"
                                            className="resize-none h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>Tell us what you think about our product.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Notes (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Any additional information you'd like to share"
                                            className="resize-none h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="px-8" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                We respect your privacy and will never share your information with third parties.
            </div>
        </div>
    )
}

