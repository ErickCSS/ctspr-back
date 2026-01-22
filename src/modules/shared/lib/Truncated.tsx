"use client";

import { useState, useMemo, useEffect } from "react";

interface TruncatedHtmlProps {
  html: string;
  limit?: number;
  moreLabel?: string;
  lessLabel?: string;
  onClickMore?: () => void;
  onClickLess?: () => void;
}

function truncateHTML(htmlString: string, limit: number): string {
  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    // Fallback for SSR: simple text truncation by words
    const textOnly = htmlString.replace(/<[^>]*>/g, "");
    if (textOnly.length <= limit) return htmlString;

    const words = textOnly.split(" ");
    let truncated = "";

    for (const word of words) {
      if ((truncated + word).length > limit) break;
      truncated += (truncated ? " " : "") + word;
    }

    return truncated + "...";
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let count = 0;

  const fragment = document.createDocumentFragment();

  function walk(source: Node, target: Node) {
    for (const node of Array.from(source.childNodes)) {
      if (count >= limit) break;

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? "";
        const remaining = limit - count;

        if (text.length <= remaining) {
          target.appendChild(document.createTextNode(text));
          count += text.length;
        } else {
          // Truncate by complete words
          const words = text.split(" ");
          let truncatedText = "";

          for (const word of words) {
            const testText = truncatedText + (truncatedText ? " " : "") + word;
            if (testText.length > remaining) break;
            truncatedText = testText;
          }

          target.appendChild(document.createTextNode(truncatedText + "..."));
          count = limit;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recriamos el elemento manteniendo su tagName y atributos
        const el = document.createElement(node.nodeName);
        for (const { name, value } of Array.from(
          (node as Element).attributes,
        )) {
          el.setAttribute(name, value);
        }

        target.appendChild(el);
        walk(node, el);

        if (count >= limit) break;
      }
    }
  }

  walk(doc.body, fragment);

  const container = document.createElement("div");
  container.appendChild(fragment);
  return container.innerHTML;
}

export function TruncatedHtml({
  html,
  limit = 300,
  moreLabel = "Show more",
  lessLabel = "Show less",
  onClickMore,
  onClickLess,
}: TruncatedHtmlProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before rendering interactive content
  useEffect(() => {
    setIsClient(true);
  }, []);

  const truncated = useMemo(() => {
    if (!isClient) {
      // During SSR, return a simple text truncation
      const textOnly = html.replace(/<[^>]*>/g, "");
      if (textOnly.length <= limit) return html;
      return textOnly.slice(0, limit) + "...";
    }
    return truncateHTML(html, limit);
  }, [html, limit, isClient]);

  // During SSR, render without interactive buttons
  if (!isClient) {
    return (
      <div
        className="w-full overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: truncated,
        }}
      />
    );
  }

  return (
    <>
      <div
        className="w-full overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: expanded ? html : truncated,
        }}
      />
      {!expanded ? (
        <button
          onClick={() => {
            setExpanded(true);
            onClickMore?.();
          }}
          className="text-secondaryColor mt-2 cursor-pointer hover:underline"
        >
          {moreLabel}
        </button>
      ) : (
        <button
          onClick={() => {
            setExpanded(false);
            onClickLess?.();
          }}
          className="text-secondaryColor mt-2 cursor-pointer hover:underline"
        >
          {lessLabel}
        </button>
      )}
    </>
  );
}
