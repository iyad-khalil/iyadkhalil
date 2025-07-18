import React from "react";
import { useState, useEffect } from "react";

interface ProgressAnimatedProps {
  value: number;
  inView: boolean;
}

export function ProgressAnimated({ value, inView }: ProgressAnimatedProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setWidth(value);
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [inView, value]);

  return (
    <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-teal-400 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
