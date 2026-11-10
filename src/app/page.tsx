import ScrollFrameHero from "@/components/home/ScrollFrameHero";
import TrustBar from "@/components/home/TrustBar";
import Differentials from "@/components/home/Differentials";
import DevelopmentsPreview from "@/components/home/DevelopmentsPreview";
import AboutPreview from "@/components/home/AboutPreview";
import PortalTeaser from "@/components/home/PortalTeaser";
import BlogPreview from "@/components/home/BlogPreview";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <ScrollFrameHero />
      <TrustBar />
      <DevelopmentsPreview />
      <AboutPreview />
      <Differentials />
      <PortalTeaser />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
