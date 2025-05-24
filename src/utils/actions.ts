"use server";

import { redirect } from "next/navigation";
import apiClient from "@/services/api";
import apiFunctions from "@/services/TextbookService";
import { signupSchema, textbookSubmitSchema } from "./schemas";

export async function signup(prevState: unknown, formData: FormData) {
  const validated = signupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!validated.success) {
    return {
      form_errors: validated.error.flatten().formErrors,
      field_errors: validated.error.flatten().fieldErrors,
      server_errors: undefined as string | undefined,
      payload: formData as FormData | undefined,
    };
  }

  try {
    await apiClient.post("signup/", validated.data);
    redirect("/login");
  } catch {
    return {
      form_errors: undefined,
      field_errors: undefined,
      server_errors: ["Signup failed. Please try again"] as
        | string[]
        | undefined,
      payload: formData as FormData | undefined,
    };
  }
}

export async function submitTextbook(prevState: unknown, formData: FormData) {
  const validated = textbookSubmitSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    school_class: formData.get("school_class"),
    publisher: formData.get("publisher"),
    price: formData.get("price"),
    condition: formData.get("condition"),
    description: formData.get("description"),
    image: formData.get("image"),
    whatsapp_contact: formData.get("whatsapp_contact"),
    viber_contact: formData.get("viber_contact"),
    telegram_contact: formData.get("telegram_contact"),
    phone_contact: formData.get("phone_contact"),
    access_token: formData.get("access_token"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { access_token, ...data } = validated.data;

  const validatedFormData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    validatedFormData.append(key, value);
  });
  console.log(access_token);
  try {
    await apiFunctions.createTextbook(validatedFormData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
    return { errors: "Failed submit" };
  }
}
