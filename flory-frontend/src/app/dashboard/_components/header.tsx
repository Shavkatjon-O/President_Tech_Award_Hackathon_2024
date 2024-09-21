"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormState } from "react-dom";
import { logout } from "../dashboard.actions";

const Header = () => {
  const { push } = useRouter();
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(logout, {
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
    push("/sign-in");
  }, [state, toast, push]);

  return (
    <header className="shadow-md bg-white px-4">
      <form
        ref={formRef}
        action={action}
        className="container mx-auto flex items-center justify-between py-4"
      >
        <div className="flex items-center space-x-4">
          <Image
            src="/placeholder.svg"
            alt="Logo"
            className="h-10"
            width="40"
            height="40"
            style={{ aspectRatio: "40/40", objectFit: "cover" }}
          />
          <h1 className="text-xl font-bold sm:inline-block hidden">Cura</h1>
        </div>
        <div className="flex items-center gap-2">
          <Input className="w-max" placeholder="Search" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <UserIcon size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Button
                onClick={() => formRef.current?.requestSubmit()}
                className="w-full justify-start"
                size="sm"
                variant="destructive"
              >
                Logout
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </form>
    </header>
  );
};

export default Header;
