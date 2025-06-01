import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must have 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must have 8 characters" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password != confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
      });
    }
  });

export const textbookSubmitSchema = z.object({
  title: z.string(),
  author: z.string(),
  school_class: z.string(),
  publisher: z.string(),
  price: z.string(),
  condition: z.enum(["New", "Used - Excellent", "Used - Good", "Used - Fair"]),
  description: z.string(),
  image: z.instanceof(Blob),
  whatsapp_contact: z.string(),
  viber_contact: z.string(),
  telegram_contact: z.string(),
  phone_contact: z.string(),
  access_token: z.string(),
});

export const filtersSchema = z
  .object({
    school_class: z.string(),
    condition: z.string(),
    publisher: z.string(),
    subject: z.string(),
    author: z.string(),
    min_price: z.string().transform(Number).pipe(z.number().nonnegative()),
    max_price: z.string().transform(Number).pipe(z.number().nonnegative()),
  })
  .superRefine((data, ctx) => {
    if (data.min_price && data.max_price && data.max_price < data.min_price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["max_price"],
        message: "Incorrect values",
      });
    }
  });
