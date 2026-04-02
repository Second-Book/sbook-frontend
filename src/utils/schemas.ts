import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(1, { message: "Korisničko ime je obavezno" }),
    email: z
      .string()
      .min(1, { message: "Email je obavezan" })
      .email({ message: "Neispravna email adresa" }),
    password: z.string().min(8, { message: "Lozinka mora imati najmanje 8 karaktera" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Lozinka mora imati najmanje 8 karaktera" }),
    confirmAge: z.preprocess(
      (val) => val === "on" || val === true,
      z.literal(true, {
        errorMap: () => ({ message: "Obavezna potvrda" }),
      })
    ),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password != confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Lozinke se ne poklapaju",
      });
    }
  });

export const textbookSubmitSchema = z.object({
  title: z.string().min(1, { message: "Naslov je obavezan" }),
  author: z.string().min(1, { message: "Autor je obavezan" }),
  subject: z.string().min(1, { message: "Predmet je obavezan" }),
  school_class: z.string().min(1, { message: "Razred je obavezan" }),
  publisher: z.string().min(1, { message: "Izdavač je obavezan" }),
  price: z.string().min(1, { message: "Cena je obavezna" }),
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
        message: "Neispravne vrednosti",
      });
    }
  });
