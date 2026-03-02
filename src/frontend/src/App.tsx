import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import Navbar from "./components/Navbar";
import OrderSection from "./components/OrderSection";
import StorySection from "./components/StorySection";
import SustainabilitySection from "./components/SustainabilitySection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Toaster richColors position="top-center" />
      <Navbar />
      <main>
        <HeroSection />
        <StorySection />
        <MenuSection />
        <OrderSection />
        <SustainabilitySection />
      </main>
      <Footer />
    </div>
  );
}
