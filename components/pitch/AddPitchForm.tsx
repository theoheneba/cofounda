"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const pitchSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  industry: z.string().min(2, { message: "Please enter an industry." }),
  fundingGoal: z.string().min(1, { message: "Please enter a funding goal." }),
})

export function AddPitchForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof pitchSchema>>({
    resolver: zodResolver(pitchSchema),
    defaultValues: {
      title: "",
      description: "",
      industry: "",
      fundingGoal: "",
    },
  })

  async function onSubmit(values: z.infer<typeof pitchSchema>) {
    setIsLoading(true)
    // Here you would typically send the pitch data to your backend
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
    setIsLoading(false)
    toast({
      title: "Pitch added",
      description: "Your pitch has been successfully added.",
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pitch Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your pitch title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your pitch" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Technology, Healthcare" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fundingGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funding Goal</FormLabel>
              <FormControl>
                <Input placeholder="e.g., $500,000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding Pitch..." : "Add Pitch"}
        </Button>
      </form>
    </Form>
  )
}

