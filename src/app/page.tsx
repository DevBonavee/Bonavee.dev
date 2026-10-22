import { navLinks } from "@content/site";

// Phase 1 shell: section anchors so the nav works. Each section is built out in later phases.
export default function Home() {
  return (
    <>
      <header id="top" className="border-line relative border-b">
        <div className="wrap pt-[132px] pb-[84px]">
          <p className="text-accent-text font-mono">~/bonavee $</p>
          <h1 className="font-display text-[clamp(40px,7vw,92px)] leading-none font-black tracking-[-0.05em]">
            Bona<span className="text-accent">vee</span>
          </h1>
        </div>
      </header>
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
