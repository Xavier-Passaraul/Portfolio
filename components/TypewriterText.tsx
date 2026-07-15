"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;       // ms entre cada letra
  startDelay?: number;  // ms antes de empezar a escribir
  showCursor?: boolean; // si este bloque debe mostrar el cursor activo
  onComplete?: () => void;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 60,
  startDelay = 0,
  showCursor = true,
  onComplete,
  className = "",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));

        if (currentIndex >= text.length) {
          clearInterval(intervalId);
          onComplete?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span className="text-blue-500 font-bold animate-blink">_</span>
      )}
    </span>
  );
}