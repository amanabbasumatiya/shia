import { useState, useEffect } from "react";
import { Compass } from "lucide-react";

interface QiblaCompassProps {
  direction: number | null;
}

export function QiblaCompass({ direction }: QiblaCompassProps) {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `rotate(${direction || 0}deg)` }}
      >
        <Compass className="w-full h-full text-primary animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-2xl font-bold">{Math.round(direction || 0)}°</div>
      </div>
    </div>
  );
}
