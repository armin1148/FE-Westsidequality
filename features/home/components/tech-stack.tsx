import BaseContainer from "@/components/layout/base-container";
import { Button } from "@/components/ui/button";
import { parseLineBreak } from "@/lib/utils";
import Image from "next/image";
import { ANCHOR_IDS } from "@/lib/constants";
export interface TechStackProps {
  data: {
    heading: string;
    textLink: string;
    background: string;
    left: {
      title: string;
      icon: string;
      sections: {
        label: string;
        image: string;
      }[];
    }[];
    right: {
      title: string;
      icon: string;
      sections: {
        label: string;
        image: string;
      }[];
    }[];
  };
}

const TechStack = ({ data }: TechStackProps) => {
  const {
    heading = "",
    background = "",
    textLink = "",
    left = [],
    right = [],
  } = data;
  return (
    <div
      className="py-[44px] lg:py-20"
      id={ANCHOR_IDS.TECH_STACK}
      style={{ background }}
    >
      <BaseContainer>
        <div className="flex flex-col gap-6 lg:gap-16">
          <h2
            className="text-xl lg:text-[40px] leading-[32px] lg:leading-[56px] font-bold text-center text-gray-900"
            dangerouslySetInnerHTML={{ __html: parseLineBreak(heading) }}
          ></h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[30px]">
            <div className="flex flex-col gap-4 lg:gap-[30px]">
              {left.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-8 rounded-xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex justify-start items-center gap-4 lg:gap-6">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      className="w-[54px] h-[54px] lg:w-16 lg:h-16"
                      width={64}
                      height={64}
                      unoptimized
                    />

                    <h3
                      className="text-lg lg:text-2xl font-bold text-left text-gray-900"
                      dangerouslySetInnerHTML={{
                        __html: parseLineBreak(item.title),
                      }}
                    ></h3>
                  </div>
                  <div className="w-full h-px border-b border-dashed border-[#a0a3a9]"></div>
                  {item.sections.map((sec, indexChild) => (
                    <div key={indexChild}>
                      {sec.label && (
                        <ul className="list-disc list-inside mb-6">
                          <li
                            className="text-sm lg:text-base font-medium text-left text-gray-900"
                            dangerouslySetInnerHTML={{
                              __html: parseLineBreak(sec.label),
                            }}
                          ></li>
                        </ul>
                      )}
                      <Image
                        src={sec.image}
                        alt={sec.image}
                        className="w-fit"
                        width={100}
                        height={100}
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 lg:gap-[30px]">
              {right.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-8 rounded-xl bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex justify-start items-center gap-4 lg:gap-6">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      className="w-[54px] h-[54px] lg:w-16 lg:h-16"
                      width={64}
                      height={64}
                      unoptimized
                    />

                    <h3
                      className="text-lg lg:text-2xl font-bold text-left text-gray-900"
                      dangerouslySetInnerHTML={{
                        __html: parseLineBreak(item.title),
                      }}
                    ></h3>
                  </div>
                  <div className="w-full h-px border-b border-dashed border-[#a0a3a9]"></div>
                  {item.sections.map((sec, indexChild) => (
                    <div key={indexChild}>
                      {sec.label && (
                        <ul className="list-disc list-inside mb-6">
                          <li
                            className="text-sm lg:text-base font-medium text-left text-gray-900"
                            dangerouslySetInnerHTML={{
                              __html: parseLineBreak(sec.label),
                            }}
                          ></li>
                        </ul>
                      )}
                      <Image
                        src={sec.image}
                        alt={sec.image}
                        className="w-fit"
                        width={100}
                        height={100}
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {textLink && (
            <Button
              variant="link"
              className="font-bold text-[#0093FF] text-xl hover:no-underline hidden lg:block"
              dangerouslySetInnerHTML={{ __html: parseLineBreak(textLink) }}
            ></Button>
          )}
        </div>
      </BaseContainer>
    </div>
  );
};

export default TechStack;
