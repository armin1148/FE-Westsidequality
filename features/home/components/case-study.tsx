"use client";
import BaseContainer from "@/components/layout/base-container";
import { parseLineBreak } from "@/lib/utils";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ANCHOR_IDS } from "@/lib/constants";

export interface CaseStudyProps {
  data: {
    heading: string;
    cases: {
      title: string;
      description: string;
      image: string;
      metrics: { icon: string; title: string; description: string }[];
    }[];
  };
}

const CaseStudy = ({ data }: CaseStudyProps) => {
  const { heading = "", cases = [] } = data;

  return (
    <div className="py-[44px] lg:py-20 bg-white" id={ANCHOR_IDS.CASE_STUDY}>
      <BaseContainer className="px-0 lg:px-4">
        <div className="flex flex-col gap-6 lg:gap-16">
          <h2
            className="text-xl lg:text-[40px] leading-[32px] lg:leading-[56px] font-bold text-center text-gray-900"
            dangerouslySetInnerHTML={{ __html: parseLineBreak(heading) }}
          ></h2>

          <div className="flex-col gap-6 lg:gap-16 hidden lg:flex">
            {cases.map((caseStudy, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-4 lg:gap-[50px] justify-center items-center w-full`}
              >
                {/* Case Study Image */}
                <div className="w-full h-[250px] sm:h-[300px] lg:h-[440px] lg:w-[50%] relative">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="object-cover lg:rounded-lg"
                    width={600}
                    height={440}
                    unoptimized
                  />
                </div>

                {/* Case Study Content */}
                <div className="flex flex-col gap-4 lg:gap-[32px] justify-start items-center w-full lg:w-[48%]">
                  <div className="flex flex-col gap-1 lg:gap-[4px] justify-center items-start w-full">
                    <h3
                      className="text-xl lg:text-[32px] leading-[32px] lg:leading-[48px] font-bold text-left text-[#111827]"
                      dangerouslySetInnerHTML={{
                        __html: parseLineBreak(caseStudy.title),
                      }}
                    ></h3>
                    <p
                      className="text-base lg:text-2xl font-medium text-left text-[#0083e0]"
                      dangerouslySetInnerHTML={{
                        __html: parseLineBreak(caseStudy.description),
                      }}
                    ></p>
                  </div>

                  <div className="flex flex-col gap-4 lg:gap-[24px] items-center w-full">
                    {caseStudy.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="flex gap-3 lg:gap-[20px] justify-center w-full"
                      >
                        <Image
                          src={metric.icon}
                          alt={metric.title}
                          className="w-10 h-10 lg:w-[60px] lg:h-[60px]"
                          width={60}
                          height={60}
                          unoptimized
                        />
                        <div className="flex flex-col gap-1 lg:gap-2 flex-1">
                          <h4
                            className="text-sm lg:text-xl font-bold leading-[24px] lg:leading-[32px] text-left text-[#111827]"
                            dangerouslySetInnerHTML={{
                              __html: parseLineBreak(metric.title),
                            }}
                          ></h4>
                          <p
                            className="text-sm lg:text-base font-normal text-left text-[#585d68]"
                            dangerouslySetInnerHTML={{
                              __html: parseLineBreak(metric.description),
                            }}
                          ></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="block lg:hidden">
            <Swiper
              modules={[Pagination]}
              pagination
              slidesPerView={1}
              className="w-full [&_.swiper-pagination-bullet]:bg-[#CFD1D4] [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet.swiper-pagination-bullet-active]:bg-[#A0A3A9] [&_.swiper-pagination-bullet.swiper-pagination-bullet-active]:w-9 [&_.swiper-pagination-bullet.swiper-pagination-bullet-active]:rounded-[8px]"
            >
              {cases.map((caseStudy, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col gap-4 justify-center items-center w-full pb-8">
                    {/* Case Study Image */}
                    <div className="w-full aspect-[375/275] lg:aspect-[1216/700] relative">
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.image}
                        className="object-cover"
                        fill
                        unoptimized
                      />
                    </div>

                    {/* Case Study Content */}
                    <div className="flex flex-col gap-4 lg:gap-[32px] justify-start items-center w-full lg:w-[48%] px-4">
                      <div className="flex flex-col gap-1 lg:gap-[4px] justify-center items-start w-full">
                        <h3
                          className="text-xl lg:text-[32px] leading-[32px] lg:leading-[48px] font-bold text-left text-[#111827]"
                          dangerouslySetInnerHTML={{
                            __html: parseLineBreak(caseStudy.title),
                          }}
                        ></h3>
                        <p
                          className="text-base lg:text-2xl font-medium text-left text-[#0083e0]"
                          dangerouslySetInnerHTML={{
                            __html: parseLineBreak(caseStudy.description),
                          }}
                        ></p>
                      </div>

                      <div className="flex flex-col gap-4 lg:gap-[24px] items-center w-full">
                        {caseStudy.metrics.map((metric, index) => (
                          <div
                            key={index}
                            className="flex gap-3 lg:gap-[20px] justify-center w-full"
                          >
                            <Image
                              src={metric.icon}
                              alt={metric.title}
                              className="w-10 h-10 lg:w-[60px] lg:h-[60px]"
                              width={60}
                              height={60}
                              unoptimized
                            />
                            <div className="flex flex-col gap-1 lg:gap-2 flex-1">
                              <h4
                                className="text-sm lg:text-xl font-bold leading-[24px] lg:leading-[32px] text-left text-[#111827]"
                                dangerouslySetInnerHTML={{
                                  __html: parseLineBreak(metric.title),
                                }}
                              ></h4>
                              <p
                                className="text-sm lg:text-base font-normal text-left text-[#585d68]"
                                dangerouslySetInnerHTML={{
                                  __html: parseLineBreak(metric.description),
                                }}
                              ></p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default CaseStudy;
