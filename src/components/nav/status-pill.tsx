// Static for now. Phase 5 feeds this from the live /api/status heartbeat.
export function StatusPill({ online = true }: { online?: boolean }) {
  return (
    <span className={online ? "status is-working" : "status"}>
      <span className="dot" />
      <span>{online ? "Working" : "Not working"}</span>
    </span>
  );
}
