import { z } from "zod";

const getDateTime = (date:Date) =>{
  const year = date.getUTCFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDay()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const humanReadableDate = `${year}-${month}-${day}, ${hours}:${minutes}`;
  return humanReadableDate
}
export const TimeFormSchema = z.object({
  appointment: z.string().refine((value) => {
    try {
      const parsedDate = new Date(value);
      if (parsedDate.toString() === 'Invalid Date') {
        return false;
      }
      return getDateTime(parsedDate);
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
