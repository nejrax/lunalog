import { CommunitySection } from "@/components/home/CommunitySection";
import { HeroOverviewSection } from "@/components/home/HeroOverviewSection";
import { HomeSectionNav } from "@/components/home/HomeSectionNav";
import { InsightsSection } from "@/components/home/InsightsSection";
import { TrustSection } from "@/components/home/TrustSection";

export default function Home() {
  return (
    <div className="grid gap-12">
      <HomeSectionNav />
      <HeroOverviewSection />
      <InsightsSection />
      <CommunitySection />
      <TrustSection />
    </div>
  );
}
