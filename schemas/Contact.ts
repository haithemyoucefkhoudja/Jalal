import { z } from "zod";
export const TimeFormSchema = z.object({
  appointment: z.string().refine((value) => {
    try {
      const parsedDate = new Date(value);
      if (parsedDate.toString() === 'Invalid Date') {
        return false;
      }

      // Convert to UTC
      const utcDate = new Date(parsedDate.getTime() - (parsedDate.getTimezoneOffset() * 60000));
      
      // Return the UTC date in the same format (ISO string without timezone information)
      const formattedUTCDate = utcDate.toISOString().slice(0, -1);

      // Check if the input date matches the formatted UTC date
      return formattedUTCDate;
    } catch {
      return false;
    }
  }, {
    message: 'Invalid datetime format. Format should be YYYY-MM-DDTHH:mm',
  })
})
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
