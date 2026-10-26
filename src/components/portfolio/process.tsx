import { Container } from "@/components/container";
import { SecHead } from "@/components/sections/sec-head";
import { processSteps } from "@/lib/content";
import { ProcessSteps } from "./process-steps";

export function Process() {
  return (
    <section className="block" id="process">
      <Container>
        <SecHead
          path={
            <>
              bonavee.dev/portfolio<b>#process</b>
            </>
          }
          title={
            <>
              How we&apos;ll <em>work</em>
            </>
          }
        >
          Five steps, the same every time, so you always know what happens next and what it costs.
        </SecHead>
        <ProcessSteps steps={processSteps} />
      </Container>
    </section>
  );
}
