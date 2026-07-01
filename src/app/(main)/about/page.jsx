import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutStats from "@/components/about/AboutStats";
import AboutStory from "@/components/about/AboutStory";


export const metadata = {
  title: "About Us",
  description: "Learn about Pundra University Blood Aid Organization — who we are, our mission, and how we save lives.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutMission/>
      <AboutStory />
      
     
     
    </>
  );
}