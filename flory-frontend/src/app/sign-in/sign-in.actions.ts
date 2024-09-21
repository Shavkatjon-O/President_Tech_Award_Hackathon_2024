"use server";

import { axiosInstance } from "@/lib/axios";
import { SIGNIN_SCHEMA } from "./sign-in.schemas";
import { cookies } from "next/headers";

export async function signIn(prevState: any, formData: FormData) {
  try {
    const validatedFields = SIGNIN_SCHEMA.safeParse({
      phone_number: formData.get("phone_number"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid fields",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await axiosInstance.post(
      "/users/token/",
      validatedFields.data
    );

    cookies().set("token", response.data.access, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return {
      success: true,
      message: "Successfully signed in",
    };
  } catch (error) {
    console.log({ error });

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
