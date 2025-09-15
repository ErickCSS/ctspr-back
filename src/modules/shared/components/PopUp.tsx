"use client";

import { Button } from "@modules/ui/button";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/modules/shared/lib/utils";

export const PopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopUp(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();

  return (
    <AnimatePresence>
      {showPopUp && (
        <motion.div
          className={cn(
            "from-primaryColor via-primaryColor/70 to-secondaryColor fixed right-5 bottom-5 z-50 flex w-[350px] items-center justify-center rounded-xl bg-gradient-to-tr p-6",
            showPopUp ? "visible opacity-100" : "invisible opacity-0",
          )}
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Button
            size="icon"
            className="absolute -top-2 -right-2 cursor-pointer rounded-full"
            onClick={() => setShowPopUp(false)}
          >
            <IconX className="h-6 w-6" />
          </Button>
          <motion.div className="w-full space-y-2 rounded-xl bg-white p-6">
            <h3 className="text-2xl font-bold">Gracias por visitarnos</h3>
            <p className="text-base">
              En CTS, conectamos a personas en busca de empleo temporero con
              empresas que desean fortalecer sus equipos.
            </p>
            <Button
              className="min-h-[40px] w-full cursor-pointer"
              onClick={() =>
                router.push("https://ctspr.typeform.com/to/A5PCXQeP")
              }
            >
              ¿Cómo te enteraste de nosotros?
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
