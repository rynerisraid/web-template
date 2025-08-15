import SignUpForm from "@/components/auth/sign-up-form"
import Link from "next/link"
import { LayoutDashboard } from "lucide-react"
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation"
export default async function SignUpPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <LayoutDashboard className="text-primary h-10 w-10" />
            <span className="text-2xl font-bold text-foreground">Wiki</span>
          </Link>
        </div>

        <SignUpForm />
      </div>
    </div>
  )
}