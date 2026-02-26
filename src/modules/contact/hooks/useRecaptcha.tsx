// hooks/useRecaptcha.ts
import { useCallback, useEffect, useState } from "react";

type UseRecaptcha = {
  ready: boolean;
  execute: (action: string) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad?: () => void;
  }
}

/**
 * Hook para cargar y ejecutar reCAPTCHA v3.
 */
export function useRecaptcha(): UseRecaptcha {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY no está configurado");
      return;
    }

    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => {
        setReady(true);
      });
      return;
    }

    const scriptId = "recaptcha-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    window.onRecaptchaLoad = () => {
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(() => {
          setReady(true);
        });
      }
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}&onload=onRecaptchaLoad`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      delete window.onRecaptchaLoad;
    };
  }, []);

  const execute = useCallback(async (action: string): Promise<string> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      throw new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY no está configurado");
    }

    if (!window.grecaptcha) {
      throw new Error("reCAPTCHA no está disponible");
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(siteKey, { action })
          .then((token: string) => {
            resolve(token);
          })
          .catch((error: Error) => {
            reject(error);
          });
      });
    });
  }, []);

  return { ready, execute };
}
