import { z } from "zod";

export const SIGNIN_SCHEMA = z.object({
  phone_number: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
