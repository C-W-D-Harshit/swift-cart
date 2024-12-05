"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  LoginFormValues,
  SignupFormValues,
  ForgotPasswordFormValues,
} from "@/lib/schemas/auth";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signUpAction } from "../actions";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: "login" | "signup" | "forgot-password";
  backUrl?: string;
}

export default function AuthForm({
  mode,
  backUrl,
  className,
  ...props
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues | SignupFormValues | ForgotPasswordFormValues>({
    resolver: zodResolver(
      mode === "login"
        ? loginSchema
        : mode === "signup"
        ? signupSchema
        : forgotPasswordSchema
    ),
    defaultValues: {
      rememberMe: false,
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const handleSignUp = async (data: SignupFormValues) => {
    const toastId = toast.loading("Loading...");
    const { email, password } = data;
    try {
      // Handle sign up action
      const response = await signUpAction(email, password);

      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message, { id: toastId });

      signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  const handleLogin = async (data: LoginFormValues) => {
    const toastId = toast.loading("Loading...");
    const { email, password } = data;
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) throw new Error(response.error);

      // Redirect to dashboard
      router.push(next ?? "/");
      toast.success("Logged in successfully", { id: toastId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  const onSubmit = (
    data: LoginFormValues | SignupFormValues | ForgotPasswordFormValues
  ) => {
    switch (mode) {
      case "login":
        handleLogin(data as LoginFormValues);
        break;
      case "signup":
        handleSignUp(data as SignupFormValues);
        break;
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {backUrl && (
        <Button
          variant="ghost"
          className="absolute left-4 top-4 md:left-8 md:top-8"
          asChild
        >
          <Link href={backUrl}>
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
              className="mr-2 h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </Link>
        </Button>
      )}
      <motion.div
        className="flex flex-col space-y-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary p-4 w-16 h-16 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-primary-foreground"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === "login"
            ? "Welcome back"
            : mode === "signup"
            ? "Create an account"
            : "Forgot password"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === "login"
            ? "Please enter your details to login."
            : mode === "signup"
            ? "Enter your details below to create your account."
            : "Enter your email to reset your password."}
        </p>
      </motion.div>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {mode !== "forgot-password" && (
          <div className="grid grid-cols-3 gap-2">
            <Button type="button" variant="outline" className="w-full">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                  fill="currentColor"
                />
              </svg>
              Apple
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                  fill="currentColor"
                />
              </svg>
              Google
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                  fill="currentColor"
                />
              </svg>
              Twitter
            </Button>
          </div>
        )}
        {mode !== "forgot-password" && (
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        {mode !== "forgot-password" && (
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                autoCorrect="off"
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {"password" in errors && errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        )}
        {mode === "signup" && (
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
            {"confirmPassword" in errors && errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}
        {mode === "login" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                {...register("rememberMe")}
                onCheckedChange={(checked) => {
                  setValue("rememberMe", checked as boolean);
                }}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary/90"
            >
              Forgot password?
            </Link>
          </div>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {mode === "login"
            ? "Login"
            : mode === "signup"
            ? "Sign Up"
            : "Reset Password"}
        </Button>
      </motion.form>
      <motion.p
        className="mt-4 px-8 text-center text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-primary hover:text-primary/90 font-medium"
            >
              Sign Up
            </Link>
          </>
        ) : mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/90 font-medium"
            >
              login
            </Link>
          </>
        ) : (
          <>
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/90 font-medium"
            >
              login
            </Link>
          </>
        )}
      </motion.p>
    </div>
  );
}
