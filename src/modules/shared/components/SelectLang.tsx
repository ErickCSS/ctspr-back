"use client";

import Select, { OnChangeValue } from "react-select";
import { JSX, useTransition } from "react";
import "flag-icons/css/flag-icons.min.css";

import { ChangeIntl } from "@modules/shared/actions/ChangeIntl.action";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "@/modules/shared/contexts/TranslationContext";

type OptionType = {
  value: string;
  label: string | JSX.Element;
};

const SelectItem = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();
  const { translations, currentSlug } = useTranslations();

  const options = [
    {
      value: "es",
      label: (
        <div className="flex gap-2">
          <span className="font-primary text-base font-light">ES</span>
          <span className="fi fi-pr"></span>
        </div>
      ),
    },
    {
      value: "en",
      label: (
        <div className="flex gap-2">
          <span className="font-primary text-base font-light">EN</span>
          <span className="fi fi-us"></span>
        </div>
      ),
    },
  ];
  const activeOption = options.find((option) => option.value === activeLocale);

  const onSelectChange = (option: OnChangeValue<OptionType, false>) => {
    if (!option) return;
    const locale = option.value;
    startTransition(() => {
      const url = new URL(window.location.href);

      // Check if we're on a blog post page and have translations available
      const isBlogPost = pathname.includes("/blog/") && currentSlug;

      if (isBlogPost && translations && translations.length > 0) {
        // Find the translation for the target locale
        const targetTranslation = translations.find(
          (t) => t.language.code.toLowerCase() === locale.toLowerCase(),
        );

        if (targetTranslation) {
          // Redirect to the translated post with the correct slug
          url.pathname = `/${locale}/blog/${targetTranslation.slug}`;

          ChangeIntl(locale).then(() => {
            router.replace(url.pathname + url.search, { scroll: false });
          });
        } else {
          // No translation available, stay on current page but change UI language
          ChangeIntl(locale).then(() => {
            // Just refresh to update the UI language without changing the page
            router.refresh();
          });
        }
      } else {
        // Default behavior for non-blog pages
        url.pathname = url.pathname.replace(/\/(es|en)(\/|$)/, `/${locale}$2`);

        ChangeIntl(locale).then(() => {
          router.replace(url.pathname + url.search, { scroll: false });
        });
      }
    });
  };

  return (
    <div className="w-auto md:w-fit">
      <Select
        defaultValue={activeOption}
        options={options}
        instanceId={activeOption?.value}
        onChange={onSelectChange}
        isDisabled={isPending}
        backspaceRemovesValue={false}
        escapeClearsValue={false}
        isSearchable={false}
        classNamePrefix="select-lang"
        styles={{
          dropdownIndicator(base) {
            return {
              ...base,
              display: "none",
            };
          },
          indicatorSeparator(base) {
            return {
              ...base,
              display: "none",
            };
          },
          menu: (styles) => ({
            ...styles,
            width: "85px",
            zIndex: "99999 !important",
          }),
        }}
      />
    </div>
  );
};

export default SelectItem;
