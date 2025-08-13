import { Suspense } from "react";

import HeroSection from "@/components/hero-section";
import FeaturedTemplates from "@/components/featured-templates";
import FeaturedCourses from "@/components/featured-courses";
import StatsSection from "@/components/stats-section";
import NewsletterSection from "@/components/newsletter-section";
import LoadingSpinner from "@/components/loading-spinner";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background effects for dark mode */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/8 via-background to-black/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gray-500/3 rounded-full blur-3xl animate-pulse delay-700" />
        {/* Additional dark mode friendly light spots */}
        <div className="absolute top-1/3 left-3/4 w-64 h-64 bg-white/2 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gray-400/2 rounded-full blur-2xl" />
      </div>
      
      <Navigation />
      <div className="max-w-8xl mx-auto">
        <main>
          <HeroSection />
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedTemplates />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedCourses />
          </Suspense>
          <StatsSection />
          <NewsletterSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}