import { z } from "zod";
import { filtersSchema } from "./schemas";

export type ImageType = {
  preview: string;
  detail: string;
  full_size: string;
};

export type TextbookType = {
  id: number;
  seller: string;
  image: ImageType;
  title: string;
  author: string;
  school_class: string;
  publisher: string;
  subject: string;
  price: string;
  description: string;
  whatsapp_contact: string;
  viber_contact: string;
  telegram_contact: string;
  phone_contact: string;
  condition: string;
  created_at: string;
  updated_at: string;
};

export type TextbooksResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TextbookType[];
};

export type CredentialsType = {
  username: string;
  password: string;
};

export type UserDataType = {
  id: number;
  password: string;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  date_joined: string;
  telegram_id: string;
  telephone: string;
  is_seller: boolean;
  is_active: boolean;
  groups: unknown[];
  user_permissions: unknown[];
};

export type FiltersState = z.input<typeof filtersSchema>;

export type FiltersErrors = z.ZodFormattedError<FiltersState, string>;
