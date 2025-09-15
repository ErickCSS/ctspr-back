import parse, { Element, domToReact, DOMNode } from "html-react-parser";
import { IconCheck } from "@tabler/icons-react"; // o cualquier ícono que uses

export function parseWithIcons(content: string, styleIcon?: string) {
  return parse(content, {
    replace: (domNode) => {
      if (
        domNode instanceof Element &&
        domNode.name === "p" &&
        domNode.children?.length
      ) {
        return (
          <div className="grid grid-cols-[auto_1fr] items-start gap-2">
            <IconCheck
              className={styleIcon || "text-primary mt-1 h-5 w-5 shrink-0"}
            />
            <p>{domToReact(domNode.children as DOMNode[])}</p>
          </div>
        );
      }

      return undefined;
    },
  });
}
