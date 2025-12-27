import BaseContainer from "@/components/layout/base-container";
import Image from "next/image";
import { parseLineBreak } from "@/lib/utils";

export interface TrustedByProps {
  data: {
    heading: string;
    background: string;
    brands: {
      content: string;
      icon: string;
    }[];
  };
}

const TrustedBy = ({ data }: TrustedByProps) => {
  const { heading = "", background = "", brands = [] } = data;
  return (
    <div className="py-[44px] lg:py-20" style={{ background }}>
      <BaseContainer>
        <div className="flex flex-col gap-6 lg:gap-16">
          <h2
            className="text-xl lg:text-[40px] leading-[32px] lg:leading-[56px] font-bold text-center text-gray-900"
            dangerouslySetInnerHTML={{ __html: parseLineBreak(heading) }}
          ></h2>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-[30px]">
            {brands?.map((brand, index) => (
              <div
                key={index}
                className="bg-white rounded-xl pb-4 pt-6 px-3 md:p-5 lg:p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.12)] flex flex-col items-center gap-2 lg:gap-4"
              >
                <div className="relative w-7 h-7 lg:w-9 lg:h-9">
                  <Image
                    src={brand.icon}
                    alt={brand.content}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p
                  className="text-sm lg:text-base text-[#585D68] text-center leading-[20px]"
                  dangerouslySetInnerHTML={{
                    __html: parseLineBreak(brand.content),
                  }}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default TrustedBy;
