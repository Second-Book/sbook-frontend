import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm"

export const metadata: Metadata = {
  title: "Registracija",
};

const Signup = () => {
  return (
    <SignupForm />
  )
}

export default Signup