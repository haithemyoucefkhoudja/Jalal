import { z } from "zod";

export const ContactFormSchema = z.object({
    email: z.string()
    .min(1, "Email is required!")
    .max(50, "Email is Too Long")
    .email("Invalid email!"),
    name: z.string()
      .min(4, "Name is too short!")
      .max(30, "Name is too Long!"),
    descreption: z.string()
      .min(1, "Descreption is required!")
      .max(100, "Descreption is too Long!")
  });