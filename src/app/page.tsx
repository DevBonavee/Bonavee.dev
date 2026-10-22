import { Hero } from "@/components/hero/hero";
import { Building } from "@/components/sections/building";
import { Contact } from "@/components/sections/contact";
import { Marquee } from "@/components/sections/marquee";
import { Portfolio } from "@/components/sections/portfolio";
import { Reading } from "@/components/sections/reading";
import { Resume } from "@/components/sections/resume";
import { SecHead } from "@/components/sections/sec-head";
import { Stack } from "@/components/sections/stack";

// Re-render hourly so the month-based shelf and live data stay current.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <main>
        <Building />
        {/* GitHub and Writing get their live data in phase 4. */}
        <section className="block" id="github">
          <div className="wrap">
            <SecHead
              path={
                <>
                  github.com/<b>Bonvee120</b>
                </>
              }
              title={
                <>
                  Shipping, <em>daily</em>
                </>
              }
            />
          </div>
        </section>
        <Portfolio />
        <Stack />
        <Reading />
        <section className="block" id="writing">
          <div className="wrap">
            <SecHead
              path={
                <>
                  bonavee120.medium.com/<b>feed</b>
                </>
              }
              title={
                <>
                  Notes from <em>the build</em>
                </>
              }
            />
          </div>
        </section>
        <Resume />
        <Contact />
      </main>
    </>
  );
}
