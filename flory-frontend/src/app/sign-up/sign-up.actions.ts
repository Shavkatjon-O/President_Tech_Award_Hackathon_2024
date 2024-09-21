"use server";

import { axiosInstance } from "@/lib/axios";
import { SIGNUP_SCHEMA } from "./sign-up.schemas";

export async function signup(
  dob: Date | undefined,
  prevState: any,
  formData: FormData
) {
  try {
    const validatedFields = SIGNUP_SCHEMA.safeParse({
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      phone_number: formData.get("phone_number"),
      address: formData.get("address"),
      password: formData.get("password"),
      dob,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid fields",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    await axiosInstance.post("/users/sign-up/", validatedFields.data);

    return {
      success: true,
      message: "Successfully signed up",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
