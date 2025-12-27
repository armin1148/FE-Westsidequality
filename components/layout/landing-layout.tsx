import Footer from "./footer";
import Header from "./header";

const LandingLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="min-h-screen pt-[50px] lg:pt-[72px]">{children}</main>
    <Footer />
  </>
);

export default LandingLayout;
