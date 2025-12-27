import BaseContainer from "@/components/layout/base-container";
import { parseLineBreak } from "@/lib/utils";
import Image from "next/image";
import { ANCHOR_IDS } from "@/lib/constants";
export interface ExpertiseProps {
  data: {
    heading: string;
    background: string;
    expertises: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
}

const Expertise = ({ data }: ExpertiseProps) => {
  const { heading = "", background = "", expertises = [] } = data;
  return (
    <div
      className="py-[44px] lg:py-20"
      style={{ background }}
      id={ANCHOR_IDS.EXPERTISE}
    >
      <BaseContainer>
        <div className="flex flex-col gap-6 lg:gap-16">
          <h2
            className="text-xl lg:text-[40px] leading-[32px] lg:leading-[56px] font-bold text-center text-gray-900"
            dangerouslySetInnerHTML={{ __html: parseLineBreak(heading) }}
          ></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[30px]">
            {expertises.map((item, index) => (
              <div
                key={index}
                className="flex lg:flex-col lg:items-center p-4 lg:pb-6 lg:pt-8 gap-2 lg:gap-4 rounded-xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)]"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="flex-shrink-0 w-10 h-10 lg:w-[88px] lg:h-[88px]"
                  width={88}
                  height={88}
                  unoptimized
                />
                <div className="flex flex-col gap-2 lg:gap-4">
                  <h3
                    className="text-base lg:text-xl font-bold lg:text-center text-gray-900"
                    dangerouslySetInnerHTML={{
                      __html: parseLineBreak(item.title),
                    }}
                  ></h3>
                  <p
                    className="text-sm lg:text-center text-[#585d68]"
                    dangerouslySetInnerHTML={{
                      __html: parseLineBreak(item.description),
                    }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Expertise;
