"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth/actions";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full glass-button bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Create Account"
      )}
    </Button>
  );
}

export default function SignUpForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(register, null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } else if (state?.status === "failed" || state?.status === "invalid_data") {
      toast.error(
        "Registration failed. Please check your information and try again."
      );
    } else if (state?.status === "user_exists") {
      toast.error(
        "User already exists. Please try a different email or sign in."
      );
    }
  }, [state, router]);

  return (
    <Card className="glass-card">
      <CardHeader className="text-center pt-8 pb-2">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="bg-primary rounded-sm flex items-center justify-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground h-6 w-6">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" x2="19" y1="8" y2="14"></line>
              <line x1="22" x2="16" y1="11" y2="11"></line>
            </svg>
          </div>
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your information to create an account
        </p>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-lg text-sm">
              {state.error}
            </div>
          )}

          {state?.status === "success" && (
            <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"></path>
              </svg>
              Account created successfully! Redirecting to dashboard...
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="full_name" className="block text-sm font-medium text-foreground">
              Full Name
            </label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Your full name"
              required
              className="glass-effect bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="glass-effect bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              required
              className="glass-effect bg-background border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <SubmitButton />

          <div className="text-center text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
