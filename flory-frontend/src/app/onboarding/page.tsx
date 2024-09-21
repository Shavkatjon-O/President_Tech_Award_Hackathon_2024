"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    title: "Welcome",
    content:
      "Welcome to our app! Let's get you set up in just a few easy steps.",
  },
  {
    title: "Create Profile",
    content:
      "Tell us a bit about yourself. This helps us personalize your experience.",
  },
  {
    title: "Choose Preferences",
    content: "Select your preferences to tailor the app to your needs.",
  },
  {
    title: "Final Step",
    content: "You're all set! Click finish to start using the app.",
  },
];

const Page = () => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      return;
    }
    push("/sign-in");
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col justify-between min-h-screen w-screen text-foreground p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {steps[currentStep].title}
        </h2>
        <Progress value={progress} className="w-full" />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <p className="text-xl text-center max-w-md">
          {steps[currentStep].content}
        </p>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Finish" : "Next"}
          {currentStep < steps.length - 1 && (
            <ChevronRight className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Page;
