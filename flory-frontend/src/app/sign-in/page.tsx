"use client";

import SubmitButton from "@/components/ui/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useFormState } from "react-dom";
import { signIn } from "./sign-in.actions";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const [state, action] = useFormState(signIn, {
    message: "",
    success: false,
  });

  React.useEffect(() => {
    if (!state.success) {
      if (state.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        });
      }
      return;
    }

    toast({
      title: "Success",
      description: state.message,
    });
    push("/dashboard");
  }, [state, toast, push]);

  return (
    <form
      action={action}
      className="min-h-screen flex items-center justify-center"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label htmlFor="phone_number" className="mb-1.5">
              Phone number
            </Label>
            <PhoneInput
              id="phone_number"
              name="phone_number"
              countries={["UZ"]}
              defaultCountry="UZ"
            />
            {state.errors?.phone_number && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.phone_number}
              </p>
            )}
            {state.errors?.phone_number && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors?.phone_number}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="mb-1.5">
              Password
            </Label>
            <Input
              placeholder="My password"
              id="password"
              type="password"
              required
              name="password"
            />
            {state.errors?.password && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors?.password}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton className="w-full">Sign in</SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Page;
