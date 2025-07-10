"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../schemas/contact.schema";
import { ContactSchemaType } from "../schemas/contact.schema";
import { sendEmail } from "@/app/(actions)/contactActions/actions";
import { useTransitionRouter } from "next-view-transitions";

export const useContact = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useTransitionRouter();

  const contactForm = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { handleSubmit, reset, formState } = contactForm;
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (data: ContactSchemaType) => {
    const { success, error } = await sendEmail({ email: data });

    if (!success) {
      setError(error as string);
    }

    router.push("/gracias");

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        reset();
      }, 4000);
    });
  };

  return {
    contactForm,
    handleSubmit,
    onSubmit,
    error,
    isSubmitting,
    reset,
  };
};
