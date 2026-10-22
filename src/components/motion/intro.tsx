// Boot overlay: a dark terminal panel that wipes up, followed 0.2s later by a yellow one.
// Hidden unless <html data-intro="play"> (set by INTRO_SCRIPT on the first visit of a session).
export function Intro() {
  return (
    <>
      <div className="boot-y" aria-hidden="true" />
      <div className="boot" aria-hidden="true">
        <div className="boot-in">
          <div className="boot-lines">
            <span>&gt; bonavee.dev</span>
            <span>
              &gt; loading modules ........ <b>ok</b>
            </span>
            <span>
              &gt; heartbeat ............. <b>online</b>
            </span>
            <span>&gt; welcome</span>
          </div>
          <div className="boot-bar">
            <i />
          </div>
        </div>
      </div>
    </>
  );
}
