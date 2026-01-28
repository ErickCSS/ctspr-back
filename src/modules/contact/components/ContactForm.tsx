"use client";

import { Form } from "@modules/ui/form";
import { RenderFormField } from "@modules/shared/components/RenderFormField";
import { useContact } from "@modules/contact/hooks/useContact";
import { IconLoader2 } from "@tabler/icons-react";
import { Label } from "@modules/ui/label";
import { useTranslations } from "next-intl";

export const ContactForm = () => {
  const { contactForm, onSubmit, error, isSubmitting } = useContact();
  const t = useTranslations("ContactUs.form");

  return (
    <Form {...contactForm}>
      <form
        onSubmit={onSubmit}
        className="font-sf mx-auto mt-10 space-y-4 lg:w-3xl"
      >
        <Label className="text-lg">{t("name")}</Label>
        <RenderFormField
          control={contactForm.control}
          name="name"
          type="text"
          placeholder="John Doe"
          errors={contactForm.formState.errors}
        />

        <Label className="text-lg">{t("email")}</Label>
        <RenderFormField
          control={contactForm.control}
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          errors={contactForm.formState.errors}
        />

        <Label className="text-lg">{t("phone")}</Label>
        <RenderFormField
          control={contactForm.control}
          name="phone"
          type="phone"
          placeholder="123-456-7890"
          errors={contactForm.formState.errors}
        />

        <Label className="text-lg">{t("city")}</Label>
        <RenderFormField
          control={contactForm.control}
          name="city"
          type="text"
          placeholder="San Juan"
          errors={contactForm.formState.errors}
        />

        <Label className="text-lg">{t("message")}</Label>
        <RenderFormField
          control={contactForm.control}
          name="message"
          renderTextarea
          placeholder={t("WriteUs")}
          errors={contactForm.formState.errors}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-secondaryColor disabled:bg-secondaryColor/80 flex h-12 w-45 cursor-pointer items-center justify-center text-lg font-bold text-white uppercase"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <IconLoader2 className="animate-spin" /> {t("enviando")}
            </span>
          ) : (
            t("button")
          )}
        </button>
      </form>
    </Form>
  );
};
