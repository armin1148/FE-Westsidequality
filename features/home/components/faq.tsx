"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  EnumItemType,
} from "@/components/ui/accordion";
import BaseContainer from "@/components/layout/base-container";
import { parseLineBreak } from "@/lib/utils";

export interface FAQProps {
  data: {
    heading: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

const FAQ = ({ data }: FAQProps) => {
  const { heading = "", faqs = [] } = data;
  return (
    <div className="py-[44px] lg:py-20">
      <BaseContainer>
        <div className="flex flex-col gap-6 lg:gap-9 max-w-[970px] w-full mx-auto">
          <h2
            className="text-xl lg:text-[40px] leading-[32px] lg:leading-[56px] font-bold text-center text-gray-900"
            dangerouslySetInnerHTML={{ __html: parseLineBreak(heading) }}
          ></h2>
          <Accordion type="multiple">
            {faqs.map((item, index) => (
              <AccordionItem
                key={index}
                value={index.toString()}
                className="py-2 lg:py-3"
              >
                <AccordionTrigger itemType={EnumItemType.PLUS}>
                  <h3
                    className="text-base lg:text-xl font-medium text-left text-[#111827]"
                    dangerouslySetInnerHTML={{
                      __html: parseLineBreak(item.question),
                    }}
                  ></h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p
                    className="text-sm lg:text-base text-left text-[#585d68]"
                    dangerouslySetInnerHTML={{
                      __html: parseLineBreak(item.answer),
                    }}
                  ></p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BaseContainer>
    </div>
  );
};

export default FAQ;
