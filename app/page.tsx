import Home from "@/features/home";
// get seo from selected page
import { pageService } from "@/services/pages.service";

export const generateMetadata = async () => {
  // --- BẮT ĐẦU CHỈNH SỬA ---
  try {
    // 1. Thêm log để kiểm tra xem lúc Build máy chủ nhận biến môi trường là gì
    console.log("---------------------------------------------");
    console.log("[DEBUG BUILD] Fetching Metadata...");
    console.log("[DEBUG BUILD] SERVER_HOST:", process.env.SERVER_HOST); 
    console.log("---------------------------------------------");

    const selectedPage = await pageService.getHomePage();
    
    // Kiểm tra nếu không có dữ liệu trả về thì ném lỗi xuống catch
    if (!selectedPage) {
      throw new Error("API returned null or undefined");
    }

    const seoData = JSON.parse(selectedPage.seo || "{}");
    return {
      title: seoData?.title,
      description: seoData?.description,
    };

  } catch (error) {
    // 2. Bắt lỗi tại đây để KHÔNG làm sập quá trình Build
    console.error("⚠️ LỖI KHI LẤY METADATA (Đã bỏ qua để tiếp tục Build):");
    console.error(error);

    // 3. Trả về dữ liệu mặc định (Fallback)
    return {
      title: "Trang chủ - Westside", // Bạn hãy sửa thành Tên dự án của bạn
      description: "Đang tải dữ liệu...",
    };
  }
  // --- KẾT THÚC CHỈNH SỬA ---
};

const HomePage = () => <Home />;

export default HomePage;