"use client";
import BaseContainer from "@/components/layout/base-container";
import { parseLineBreak } from "@/lib/utils";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export interface MainSlideProps {
  data: {
    slides: {
      heading: string;
      button: string;
      background: string;
      descriptions: {
        icon: string;
        content: string;
      }[];
    }[];
  };
}
const MainSlide = ({ data }: MainSlideProps) => {
  const { slides = [] } = data;

  return (
    <Swiper
      modules={[Pagination]}
      pagination
      slidesPerView={1}
      className="w-full [&_.swiper-pagination-bullet]:bg-white/40 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet.swiper-pagination-bullet-active]:bg-white [&_.swiper-button-prev]:bg-black/20 [&_.swiper-button-prev]:border-white/40 [&_.swiper-button-prev]:border [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:hidden lg:[&_.swiper-button-prev]:flex [&_.swiper-button-next]:bg-black/20 [&_.swiper-button-next]:border-white/40 [&_.swiper-button-next]:border [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:text-white [&_.swiper-button-next]:hidden lg:[&_.swiper-button-next]:flex"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.background})` }}
          >
            <BaseContainer>
              <div className="h-[500px] lg:h-[700px]">
                <div className="flex flex-col gap-6 lg:gap-8 text-white justify-center h-full max-w-[327px] lg:max-w-[620px] mx-auto lg:mx-0">
                  <h2
                    className="text-lg lg:text-[32px] lg:leading-[44px] font-bold text-center lg:text-left uppercase"
                    dangerouslySetInnerHTML={{
                      __html: parseLineBreak(slide.heading),
                    }}
                  ></h2>

                  {slide?.descriptions?.map((description, indexChild) => (
                    <div className="flex items-center gap-3" key={indexChild}>
                      <Image
                        src={description.icon}
                        alt={description.content}
                        className="lg:w-9 lg:h-9 w-6 h-6"
                        width={36}
                        height={36}
                        unoptimized
                      />
                      <p
                        className="text-xs leading-[18px] lg:leading-[24px] lg:text-base font-semibold uppercase"
                        dangerouslySetInnerHTML={{
                          __html: parseLineBreak(description.content),
                        }}
                      ></p>
                    </div>
                  ))}
                  <Button
                    className="bg-[#0093FF] max-w-[240px] lg:max-w-[184px] rounded-[8px] text-sm lg:text-base font-semibold min-h-12 lg:min-h-[52px] mx-auto lg:mx-0 w-full"
                    dangerouslySetInnerHTML={{
                      __html: parseLineBreak(slide.button),
                    }}
                  ></Button>
                </div>
              </div>
            </BaseContainer>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlide;
