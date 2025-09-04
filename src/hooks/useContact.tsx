// hooks/useContact.ts
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactSchemaType } from "../schemas/contact.schema";
import { sendEmail } from "@/app/(actions)/contactActions/actions";
import { useTransitionRouter } from "next-view-transitions";
import { useRecaptcha } from "@/hooks/useRecaptcha"; // tu hook de reCAPTCHA

export const useContact = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useTransitionRouter();
  const { ready: recaptchaReady, execute: runRecaptcha } = useRecaptcha();

  const contactForm = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      message: "",
    },
  });

  const { handleSubmit, reset, formState } = contactForm;
  const isSubmitting = formState.isSubmitting;

  const onSubmit = handleSubmit(async (data) => {
    setError(null);

    if (!recaptchaReady) {
      setError("ReCAPTCHA aún no está listo. Intenta de nuevo en un momento.");
      return;
    }

    const token = await runRecaptcha("contact");

    const { success, error: sendError } = await sendEmail({
      email: data,
      recaptchaToken: token,
    });

    if (!success) {
      setError(sendError as string);
      return;
    }

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        reset();
        router.push("/gracias");
      }, 4000);
    });
  });

  return {
    contactForm,
    onSubmit,
    error,
    isSubmitting,
    recaptchaReady,
  };
};
