"use client";

import { Form } from "@components/ui/form";
import { RenderFormField } from "@components/shared/RenderFormField";
import { useContact } from "@/hooks/useContact";
import { IconLoader2 } from "@tabler/icons-react";
import { Label } from "@components/ui/label";

export const ContactForm = () => {
  const { contactForm, onSubmit, error, isSubmitting } = useContact();

  return (
    <Form {...contactForm}>
      <form
        onSubmit={onSubmit}
        className="font-sf mx-auto mt-10 space-y-4 lg:w-3xl"
      >
        <Label className="text-lg">Nombre</Label>
        <RenderFormField
          control={contactForm.control}
          name="name"
          type="text"
          placeholder="John Doe"
          errors={contactForm.formState.errors}
        />

        <Label className="text-lg">Email</Label>
        <RenderFormField
          control={contactForm.control}
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          errors={contactForm.formState.errors}
        />

        <Label className="text-lg">Teléfono</Label>
        <RenderFormField
          control={contactForm.control}
          name="phone"
          type="phone"
          placeholder="123-456-7890"
          errors={contactForm.formState.errors}
        />

        <Label className="text-lg">
          ¿En qué pueblo resides? ¿O donde está ubicada tu empresa?
        </Label>
        <RenderFormField
          control={contactForm.control}
          name="city"
          type="text"
          placeholder="San Juan"
          errors={contactForm.formState.errors}
        />

        <Label className="text-lg">Mensaje</Label>
        <RenderFormField
          control={contactForm.control}
          name="message"
          renderTextarea
          placeholder="Escribe tu mensaje"
          errors={contactForm.formState.errors}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-secondaryColor disabled:bg-secondaryColor/80 flex h-12 w-45 items-center justify-center text-lg font-bold text-white uppercase"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <IconLoader2 className="animate-spin" /> Enviando
            </span>
          ) : (
            "Enviar"
          )}
        </button>
      </form>
    </Form>
  );
};
