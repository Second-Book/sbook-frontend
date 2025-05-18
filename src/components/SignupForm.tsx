"use client";

import { signup } from "@/utils/actions";
import Link from "next/link";
import { useActionState } from "react";

const SignupForm = () => {
  const [formState, formAction] = useActionState(signup, {
    form_errors: undefined,
    field_errors: undefined,
    server_errors: undefined,
    payload: undefined,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>
        <form action={formAction}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-gray-500"
              defaultValue={
                formState.payload
                  ? (formState.payload.get("username") as string) || ""
                  : ""
              }
            />
            {formState.field_errors && formState.field_errors.username && (
              <p className="text-red-500 mt-2">
                {formState.field_errors.username[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-gray-500"
              defaultValue={
                formState.payload
                  ? (formState.payload.get("email") as string) || ""
                  : ""
              }
            />
            {formState.field_errors && formState.field_errors.email && (
              <p className="text-red-500 mt-2">
                {formState.field_errors.email[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-gray-500"
              defaultValue={
                formState.payload
                  ? (formState.payload.get("password") as string) || ""
                  : ""
              }
            />
            {formState.field_errors && formState.field_errors.password && (
              <p className="text-red-500 mt-2">
                {formState.field_errors.password[0]}
              </p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:border-gray-500"
              defaultValue={
                formState.payload
                  ? (formState.payload.get("confirmPassword") as string) || ""
                  : ""
              }
            />
            {formState.form_errors && (
              <p className="text-red-500 mt-2">{formState.form_errors[0]}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none">
            Sign Up
          </button>
        </form>
        {formState.server_errors && (
          <p className="text-red-500 mt-2">{formState.server_errors[0]}</p>
        )}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
