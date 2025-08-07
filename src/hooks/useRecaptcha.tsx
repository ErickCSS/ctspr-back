// hooks/useRecaptcha.ts
import { useCallback, useEffect, useState } from "react";
import Script from "next/script";

type UseRecaptcha = {
  ready: boolean;
  execute: (action: string) => Promise<string>;
};

/**
 * Hook para cargar y ejecutar reCAPTCHA v3.
 */
export function useRecaptcha(): UseRecaptcha {
  const [ready, setReady] = useState(false);

  // 1️⃣ Insertamos el <script> solo una vez
  useEffect(() => {
    const onLoad = () => setReady(true);
    if (window.grecaptcha) {
      // ya estaba cargado
      setReady(true);
    } else {
      // esperamos el evento que dispara Next.js Script
      window.___grecaptcha_onload = onLoad;
    }
    return () => {
      delete window.___grecaptcha_onload;
    };
  }, []);

  const execute = useCallback(
    async (action: string) => {
      if (!ready) throw new Error("reCAPTCHA aún no está listo");
      return await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action },
      );
    },
    [ready],
  );

  return { ready, execute };
}
