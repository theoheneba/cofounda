import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const pitchSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters long" }),
  category: z.string().min(1, { message: "Please select a category" }),
  stage: z.string().min(1, { message: "Please select a stage" }),
  fundingNeeded: z.string().min(1, { message: "Please enter the funding needed" }),
  equity: z.string().min(1, { message: "Please enter the equity offered" }),
  location: z.string().min(1, { message: "Please enter the location" }),
})

export function PitchCreation() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof pitchSchema>>({
    resolver: zodResolver(pitchSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      stage: "",
      fundingNeeded: "",
      equity: "",
      location: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof pitchSchema>) => {
    setIsSubmitting(true)
    // Here you would typically send the pitch data to your backend
    console.log(values)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
    setIsSubmitting(false)
    // Reset form or show success message
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Pitch</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pitch Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your pitch title" {...field} />
                  </FormControl>
                  <FormDescription>
                    A catchy title for your startup idea
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pitch Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your startup idea in detail" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a comprehensive description of your startup idea
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the category that best fits your startup
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Startup Stage</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select startup stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="idea">Idea</SelectItem>
                      <SelectItem value="mvp">MVP</SelectItem>
                      <SelectItem value="early">Early Traction</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Indicate the current stage of your startup
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fundingNeeded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funding Needed</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $500,000" {...field} />
                  </FormControl>
                  <FormDescription>
                    How much funding are you looking to raise?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="equity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equity Offered</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 20%" {...field} />
                  </FormControl>
                  <FormDescription>
                    What percentage of equity are you offering?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. San Francisco, CA" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where is your startup based?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Pitch"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

