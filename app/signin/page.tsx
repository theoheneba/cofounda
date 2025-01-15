import { SignInForm } from "@/components/SignInForm"

export default function SignInPage() {
  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#FDF8F7]">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#4A3333]">
            Welcome Back
          </h1>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

