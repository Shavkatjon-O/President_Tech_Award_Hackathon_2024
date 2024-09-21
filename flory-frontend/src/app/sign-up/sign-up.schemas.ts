import { z } from "zod";

export const SIGNUP_SCHEMA = z.object({
  first_name: z.string().min(1, "Name is required"),
  last_name: z.string().min(1, "Surname is required"),
  dob: z.date(),
  phone_number: z.string().min(1, " Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(1, "Address is required"),
});
