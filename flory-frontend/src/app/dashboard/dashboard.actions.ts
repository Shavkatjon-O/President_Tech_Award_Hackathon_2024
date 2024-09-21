"use server";
import { cookies } from "next/headers";

export async function logout() {
  try {
    console.log("request");

    cookies().delete("token");

    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
