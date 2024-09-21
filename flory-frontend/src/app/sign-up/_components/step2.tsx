"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";

const Step2 = () => {
  const { push } = useRouter();

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full">
          <PartyPopper className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome aboard!</CardTitle>
        <CardDescription>
          You have successfully completed the onboarding process.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Onboarding Progress</span>
            <span className="font-medium">100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <h3 className="font-medium">Completed Steps:</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Account creation</li>
            <li>Profile setup</li>
            <li>Preferences configuration</li>
            <li>Tour of key features</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => push("/sign-in")} className="w-full">
          Go to login
        </Button>
      </CardFooter>
    </Card>
  );
};
export default Step2;
