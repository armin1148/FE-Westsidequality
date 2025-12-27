import Home from "@/features/home";
// get seo from selected page
import { pageService } from "@/services/pages.service";

export const generateMetadata = async () => {
  const selectedPage = await pageService.getHomePage();
  const seoData = JSON.parse(selectedPage.seo || "{}");
  return {
    title: seoData?.title,
    description: seoData?.description,
  };
};
const HomePage = () => <Home />;

export default HomePage;
