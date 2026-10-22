import { navLinks } from "@content/site";
import { Hero } from "@/components/hero/hero";

// Sections below the hero are placeholders until phase 3.
export default function Home() {
  return (
    <>
      <Hero />
      <main>
        {navLinks.map((l) => (
          <section key={l.id} id={l.id} className="border-line border-b py-24">
            <div className="wrap">
              <p className="text-faint font-mono text-[12.5px]">~/{l.label}/</p>
              <h2 className="font-display text-[clamp(34px,5.4vw,64px)] leading-[0.98] font-extrabold tracking-[-0.04em]">
                {l.label}
              </h2>
            </div>
          </section>
        ))}
        <section id="contact" className="py-24">
          <div className="wrap">
            <h2 className="font-display text-[clamp(46px,7.6vw,108px)] leading-[0.9] font-black tracking-[-0.05em]">
              Let&apos;s build something <span className="text-accent-text">good.</span>
            </h2>
          </div>
        </section>
      </main>
    </>
  );
}
