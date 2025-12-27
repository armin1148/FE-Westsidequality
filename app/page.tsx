import Home from "@/features/home";
import { pageService } from "@/services/pages.service";

export const generateMetadata = async () => {
  // --- THÊM ĐOẠN LOG NÀY ---
  console.log("---------------- BUILD DEBUG ----------------");
  console.log("SERVER_HOST env:", process.env.SERVER_HOST);
  console.log("SERVER_H0ST (Check typo 0):", process.env.SERVER_H0ST); 
  console.log("NEXT_PUBLIC_API_URL env:", process.env.NEXT_PUBLIC_API_URL);
  // ----------------------------------------------------

  try {
    const selectedPage = await pageService.getHomePage();
    const seoData = JSON.parse(selectedPage.seo || "{}");
    return {
      title: seoData?.title,
      description: seoData?.description,
    };
  } catch (error) {
    // Thêm try/catch để build không bị sập, giúp bạn đọc được log
    console.error("Lỗi khi lấy Metadata:", error);
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
};

const HomePage = () => <Home />;

export default HomePage;