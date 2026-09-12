import Hero from "@/components/Hero";
import ProblemStats from "@/components/ProblemStats";
import DistanceJourney from "@/components/DistanceJourney";
import RobotReveal from "@/components/RobotReveal";
import HealthAlerts from "@/components/HealthAlerts";
import TakeControl from "@/components/TakeControl";
import UseCases from "@/components/UseCases";
import StoryContrast from "@/components/StoryContrast";
import PrivacyStates from "@/components/PrivacyStates";
import MalayalamDemo from "@/components/MalayalamDemo";
import HowItWorks, { FinalCTA } from "@/components/HowItWorks";
import Founder from "@/components/Founder";
import { CityProvider } from "@/components/CityContext";

export default function Home() {
  return (
    <CityProvider>
      <Hero />
      <ProblemStats />
      <DistanceJourney />
      <RobotReveal />
      <HealthAlerts />
      <TakeControl />
      <UseCases />
      <StoryContrast />
      <MalayalamDemo />
      <PrivacyStates />
      <HowItWorks />
      <Founder />
      <FinalCTA />
    </CityProvider>
  );
}
