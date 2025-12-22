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
    const { confirmPassword, ...signupData } = validated.data;
    await apiClient.post("/api/signup/", signupData);
  } catch (error: unknown) {
    // Check if it's a redirect (Next.js throws special error for redirects)
    if (error && typeof error === 'object' && 'digest' in error) {
      const digest = (error as { digest?: string }).digest;
      if (digest?.startsWith('NEXT_REDIRECT')) {
        throw error; // Re-throw redirect errors
      }
    }
    
    console.error("Signup error:", error);
    let errorMessage = "Signup failed. Please try again";
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: unknown } };
      if (axiosError.response?.data) {
        console.error("Server error response:", axiosError.response.data);
        if (typeof axiosError.response.data === 'object' && axiosError.response.data !== null) {
          const errorData = axiosError.response.data as Record<string, unknown>;
          const errorMessages: string[] = [];
          for (const [key, value] of Object.entries(errorData)) {
            if (Array.isArray(value)) {
              errorMessages.push(`${key}: ${value.join(', ')}`);
            } else if (typeof value === 'string') {
              errorMessages.push(`${key}: ${value}`);
            }
          }
          if (errorMessages.length > 0) {
            errorMessage = errorMessages.join('; ');
          }
        }
      }
    }
    return {
      form_errors: undefined,
      field_errors: undefined,
      server_errors: [errorMessage] as
        | string[]
        | undefined,
      payload: formData as FormData | undefined,
    };
  }
  
  redirect("/login");
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
