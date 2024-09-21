"use client";

import React from "react";
import Step1 from "./_components/step1";
import Step2 from "./_components/step2";

const Page = () => {
  const [step, setStep] = React.useState(1);

  return (
    <div className="min-h-screen grid place-items-center py-4">
      {step === 1 && <Step1 onSignup={() => setStep(2)} />}
      {step === 2 && <Step2 />}
    </div>
  );
};
export default Page;
