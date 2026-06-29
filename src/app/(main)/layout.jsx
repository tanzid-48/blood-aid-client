import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}
