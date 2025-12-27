"use client";

import Image from "next/image";
import BaseContainer from "@/components/layout/base-container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { parseLineBreak } from "@/lib/utils";
import { ANCHOR_IDS } from "@/lib/constants";

export interface ServicesProps {
  data: {
    heading: string;
    background: string;
    services: {
      title: string;
      description: string;
      image: string;
    }[];
  };
}

const Services = ({ data }: ServicesProps) => {
  const { heading = "", background = "", services = [] } = data;
  return (
    <div className="py-11 md:py-20 bg-white" id={ANCHOR_IDS.SERVICES}>
      <BaseContainer>
        <div className="flex flex-col gap-6 lg:gap-16">
          <h2
            className="text-xl lg:text-[40px] leading-[32px] lg:leading-[56px] font-bold text-center text-gray-900"
            dangerouslySetInnerHTML={{ __html: parseLineBreak(heading) }}
          ></h2>
          <div className="hidden lg:flex flex-col gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 bg-[#EBF7FF] sticky top-0 rounded-xl overflow-hidden"
              >
                <div
                  className="bg-cover bg-center"
                  style={{ backgroundImage: `url(${background})` }}
                >
                  <div className="flex flex-col gap-3 text-center max-w-[450px] mx-auto px-4 items-center justify-center h-full">
                    <h3
                      className="text-xl lg:text-[32px] leading-[32px] lg:leading-[48px] font-bold text-[#111827]"
                      dangerouslySetInnerHTML={{
                        __html: parseLineBreak(service.title),
                      }}
                    ></h3>
                    <p
                      className="text-sm lg:text-lg text-[#585D68]"
                      dangerouslySetInnerHTML={{
                        __html: parseLineBreak(service.description),
                      }}
                    ></p>
                  </div>
                </div>
                <div className="w-full aspect-[4/3] relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    className="size-full object-cover"
                    fill
                    unoptimized
                  />
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
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <div className="pb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden">
                      <div className="flex flex-col gap-3 text-center px-4 items-center justify-center w-full aspect-[342/220] max-h-[220px] bg-[#EBF7FF]">
                        <h3
                          className="text-xl lg:text-[32px] lg:leading-[48px] font-bold text-[#111827]"
                          dangerouslySetInnerHTML={{
                            __html: parseLineBreak(service.title),
                          }}
                        ></h3>
                        <p
                          className="text-sm lg:text-lg text-[#585D68]"
                          dangerouslySetInnerHTML={{
                            __html: parseLineBreak(service.description),
                          }}
                        ></p>
                      </div>
                      <div className="w-full aspect-[342/220] max-h-[220px] relative">
                        <Image
                          src={service.image}
                          alt={service.title}
                          className="size-full object-cover"
                          fill
                          unoptimized
                        />
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

export default Services;
