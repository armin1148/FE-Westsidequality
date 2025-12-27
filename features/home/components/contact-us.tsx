"use client";

import { Button } from "@/components/ui/button";
import BaseContainer from "@/components/layout/base-container";
import { parseLineBreak } from "@/lib/utils";

export interface ContactUsProps {
  data: {
    heading: string;
    contactBtn: string;
    giveDemoBtn: string;
    background: string;
  };
}

const ContactUs = ({ data }: ContactUsProps) => {
  const {
    heading = "",
    contactBtn = "",
    giveDemoBtn = "",
    background = "",
  } = data;
  return (
    <div
      className="py-[60px] lg:py-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <BaseContainer>
        <div className="flex flex-col gap-[24px] lg:gap-[32px] items-center">
          <h2
            className="text-lg lg:text-4xl leading-[28px] lg:leading-[56px] font-bold text-center text-white"
            dangerouslySetInnerHTML={{ __html: parseLineBreak(heading) }}
          ></h2>
          <div className="flex flex-col gap-[16px] lg:flex-row">
            <Button
              className="bg-white text-primary rounded-[8px] text-[#0083e0] text-base px-6 py-[11px] hover:bg-white/90 leading-[28px] h-auto font-bold"
              dangerouslySetInnerHTML={{ __html: parseLineBreak(contactBtn) }}
            ></Button>
            <Button
              variant="outline"
              className="bg-transparent text-primary rounded-[8px] border-[#70C3FF] text-white text-base px-6 py-[11px] hover:bg-white/90 hover:text-[#0083e0] leading-[28px] h-auto font-bold"
              dangerouslySetInnerHTML={{ __html: parseLineBreak(giveDemoBtn) }}
            ></Button>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContactUs;
