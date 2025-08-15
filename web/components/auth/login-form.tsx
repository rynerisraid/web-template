"use client";

import { useActionState } from "react";
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
import { useEffect } from "react";
import { login } from "@/lib/auth/actions";
import { toast } from "sonner"; // 添加 sonner toast 导入

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
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(login, null);

  // Handle successful login by redirecting
  useEffect(() => {
    if (state?.status === "success") {
      toast.success("Login successful");
      router.push("/dashboard");
    } else if (state?.status === "failed" || state?.status === "invalid_data") {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }, [state, router]);

  return (
    <Card className="glass-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-card-foreground">
          Welcome back
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
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
              required
              className="glass-effect bg-background border-input text-foreground focus:border-primary"
            />
          </div>

          <SubmitButton />

          <div className="text-center text-muted-foreground text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-primary/80 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
