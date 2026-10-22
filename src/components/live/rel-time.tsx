"use client";

import { useEffect, useState } from "react";

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const abs = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

function relative(iso: string) {
  const secs = (new Date(iso).getTime() - Date.now()) / 1000;
  for (const [unit, size] of STEPS) {
    if (Math.abs(secs) >= size) return rtf.format(Math.round(secs / size), unit);
  }
  return "just now";
}

// "2 hours ago", computed in the visitor's browser. The server renders the plain date.
export function RelTime({ iso }: { iso: string }) {
  const [text, setText] = useState(() => abs.format(new Date(iso)));
  useEffect(() => setText(relative(iso)), [iso]);
  return (
    <time dateTime={iso} suppressHydrationWarning>
      {text}
    </time>
  );
}
