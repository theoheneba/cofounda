import { SignUpForm } from "@/components/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <h1 className="text-4xl font-bold mb-6 text-primary">Join CoFounderHub</h1>
      <SignUpForm />
    </div>
  )
}

