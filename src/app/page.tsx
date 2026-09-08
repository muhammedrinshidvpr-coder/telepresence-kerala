import Hero from "@/components/Hero";
import DistanceJourney from "@/components/DistanceJourney";
import RobotReveal from "@/components/RobotReveal";
import TakeControl from "@/components/TakeControl";
import UseCases from "@/components/UseCases";
import StoryContrast from "@/components/StoryContrast";
import PrivacyStates from "@/components/PrivacyStates";
import MobilityLab from "@/components/MobilityLab";
import MalayalamDemo from "@/components/MalayalamDemo";
import OneMinuteDemo from "@/components/OneMinuteDemo";
import HowItWorks, { FinalCTA } from "@/components/HowItWorks";
import { CityProvider } from "@/components/CityContext";

export default function Home() {
  return (
    <CityProvider>
      <Hero />
      <DistanceJourney />
      <RobotReveal />
      <TakeControl />
      <OneMinuteDemo />
      <UseCases />
      <StoryContrast />
      <MobilityLab />
      <MalayalamDemo />
      <PrivacyStates />
      <HowItWorks />
      <FinalCTA />
    </CityProvider>
  );
}
