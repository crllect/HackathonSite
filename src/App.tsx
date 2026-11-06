import { For, onCleanup, onMount, type Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { stops, type StopId } from "./content";
import { setupReveals } from "./lib/reveal";
import { River } from "./components/River/River";
import { SkyClouds } from "./components/Decor/SkyClouds";
import { Hero } from "./components/Hero/Hero";
import { Stop } from "./components/Stop/Stop";
import { Schedule } from "./components/Sections/Schedule";
import { Location } from "./components/Sections/Location";
import { Faq } from "./components/Sections/Faq";
import { Sponsors } from "./components/Sections/Sponsors";
import { SignUp } from "./components/Sections/SignUp";
import { FalconPilot } from "./components/Falcon/FalconPilot";
import { Nav } from "./components/Chrome/Nav";
import { Footer } from "./components/Chrome/Footer";
import { SmootMeter } from "./components/Chrome/SmootMeter";

const SECTIONS: Record<StopId, Component> = {
  schedule: Schedule,
  location: Location,
  faq: Faq,
  sponsors: Sponsors,
  signup: SignUp,
};

const App: Component = () => {
  onMount(() => onCleanup(setupReveals()));

  return (
    <>
      <a class="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <div class="journey">
        <River />
        <SkyClouds />
        <Hero />
        <main id="main">
          <For each={stops}>
            {(stop, index) => (
              <Stop stop={stop} index={index()}>
                <Dynamic component={SECTIONS[stop.id]} />
              </Stop>
            )}
          </For>
        </main>
        <Footer />
      </div>
      <FalconPilot />
      <SmootMeter />
    </>
  );
};

export default App;
