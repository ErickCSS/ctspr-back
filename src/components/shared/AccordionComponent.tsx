import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@components/ui/accordion";
import { parseContent } from "@/utils/parseContent.utils";

interface AccordionProps {
  contentAccordion: {
    title: string;
    content: string;
  }[];
}

export const AccordionComponent = ({ contentAccordion }: AccordionProps) => {
  return (
    <Accordion type="single" collapsible defaultValue="content-1">
      {contentAccordion.map((item, index) => (
        <AccordionItem
          key={index}
          value={`content-${index + 1}`}
          className="border-zinc-300"
        >
          <AccordionTrigger className="cursor-pointer py-10 text-xl font-bold text-black hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent>{parseContent(item.content)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
