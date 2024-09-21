"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { ButtonProps } from "react-day-picker";

const SubmitButton = ({ children, ...props }: Omit<ButtonProps, "type">) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" {...props} disabled={pending || props.disabled}>
      {pending ? "Loading..." : children}
    </Button>
  );
};

export default SubmitButton;
