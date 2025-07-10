import { ContactForm } from "./ContactForm";

export const ContactComponent = () => {
  return (
    <section className="bg-white px-4 py-20">
      <div className="container mx-auto">
        <div className="space-y-10 text-center">
          <h2 className="text-5xl font-bold">Contáctenos</h2>
          <hr className="border-secondaryColor mx-auto my-3 w-[120px] border-2 outline-none" />
        </div>

        <ContactForm />
      </div>
    </section>
  );
};
