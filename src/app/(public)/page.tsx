import { CallToAction } from "@/components/home/CallToAction";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Testimonials } from "@/components/home/Testimonials";
import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
