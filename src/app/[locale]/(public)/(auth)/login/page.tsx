import { LoginPage } from "@modules/Login/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
