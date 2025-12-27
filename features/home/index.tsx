"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  CaseStudy,
  Expertise,
  FAQ,
  Services,
  TechStack,
  TrustedBy,
  AboutUs,
  MainSlide,
  ContactUs,
} from "./components";
import LandingLayout from "@/components/layout/landing-layout";
import { useApp } from "@/context/app-context";
import { useEffect, useMemo } from "react";
import { usePages } from "../pages/hooks";
import { PageBlockEntity } from "../pages/types";
import { BlockStatus } from "@/types/common/block-entity";
import { fetchHomePage } from "@/store/features/pages";

const renderContent = (block: PageBlockEntity) => {
  const data = JSON.parse(block.content?.contentJson || "{}");
  if (block.status !== BlockStatus.ACTIVE) return null;
  switch (block.template?.name) {
    case "Trusted By":
      return <TrustedBy data={{ ...data }} />;
    case "Services":
      return <Services data={{ ...data }} />;
    case "Expertises":
      return <Expertise data={{ ...data }} />;
    case "Case Study":
      return <CaseStudy data={{ ...data }} />;
    case "About Us":
      return <AboutUs data={{ ...data }} />;
    case "Tech Stack":
      return <TechStack data={{ ...data }} />;
    case "FAQ":
      return <FAQ data={{ ...data }} />;
    case "Contact Us":
      return <ContactUs data={{ ...data }} />;
    case "Main Slide":
      return <MainSlide data={{ ...data }} />;
    default:
      return null;
  }
};
const Home = () => {
  const { dispatch } = useApp();
  const { selectedPage } = usePages();
  useEffect(() => {
    dispatch(fetchHomePage());
  }, [dispatch]);
  // sort smaller blockOrder to larger
  const sortedBlocks = useMemo(() => {
    if (!selectedPage?.blocks) return [];

    return [...selectedPage.blocks].sort((a, b) => a.blockOrder - b.blockOrder);
  }, [selectedPage?.blocks]);
  return (
    <LandingLayout>
      {sortedBlocks?.map((block) => (
        <div key={block.id}>{renderContent(block)}</div>
      ))}
    </LandingLayout>
  );
};

export default Home;
