import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const settingsSchema = z.object({
  siteName: z.string().min(2).max(50),
  siteDescription: z.string().max(200),
  contactEmail: z.string().email(),
  maxUsersPerStartup: z.number().int().positive(),
  enableMentorProgram: z.boolean(),
})

type SettingsValues = z.infer<typeof settingsSchema>

const defaultValues: Partial<SettingsValues> = {
  siteName: "Cofoundar",
  siteDescription: "Find your perfect co-founder match",
  contactEmail: "support@cofoundar.com",
  maxUsersPerStartup: 5,
  enableMentorProgram: true,
}

export default function SettingsPage() {
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  })

  function onSubmit(data: SettingsValues) {
    console.log(data)
    // Here you would typically send this data to your backend
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Platform Settings</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on the site.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="siteDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  A brief description of your site for SEO purposes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormDescription>
                  The main contact email for the platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxUsersPerStartup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Users Per Startup</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>
                  The maximum number of users allowed per startup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="enableMentorProgram"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Enable Mentor Program
                  </FormLabel>
                  <FormDescription>
                    Turn on or off the mentor program feature.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Save Settings</Button>
        </form>
      </Form>
    </div>
  )
}

