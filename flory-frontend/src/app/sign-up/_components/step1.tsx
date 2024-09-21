import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/ui/submit-button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormState } from "react-dom";
import { signup } from "../sign-up.actions";

interface Props {
  onSignup: () => void;
}

const Step1 = ({ onSignup }: Props) => {
  const { toast } = useToast();
  const { back } = useRouter();
  const [dob, setDob] = React.useState<Date>();
  const signupWithParams = signup.bind(null, dob);
  const [state, action] = useFormState(signupWithParams, {
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
      description: "Successfully signed up!",
    });
    onSignup();
  }, [state, toast, onSignup]);

  return (
    <form action={action}>
      <Card className="sm:w-[420px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col">
              <Label className="mb-1.5" htmlFor="name">
                Name
              </Label>
              <Input id="first_name" name="first_name" placeholder="John" />
              {state.errors?.first_name && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.first_name}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="mb-1.5" htmlFor="last_name">
                Surname
              </Label>
              <Input id="last_name" name="last_name" placeholder="Doe" />
              {state.errors?.last_name && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.last_name}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="mb-1.5" htmlFor="address">
                Address
              </Label>
              <Input id="address" name="address" placeholder="123 Main St" />
              {state.errors?.address && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.address}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <Label className="mb-1.5" htmlFor="dob">
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={"w-full justify-start text-left font-normal"}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    id="dob"
                    mode="single"
                    selected={dob}
                    onSelect={setDob}
                  />
                </PopoverContent>
              </Popover>
              {state.errors?.dob && (
                <p className="text-red-500 text-xs mt-1">{state.errors.dob}</p>
              )}
            </div>
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
            </div>
            <div>
              <Label htmlFor="password" className="mb-1.5">
                Password
              </Label>
              <Input placeholder="My password" id="password" name="password" />
              {state.errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.password}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={back} variant="outline">
            Cancel
          </Button>
          <SubmitButton>Next</SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Step1;
