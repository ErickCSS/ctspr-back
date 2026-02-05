import { Header } from "@modules/shared/components/general/header";
import { Footer } from "@modules/shared/components/general/Footer";
import { PopUp } from "@modules/shared/components/PopUp";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <PopUp />
    </>
  );
}
