import React from "react";
import { ReactNode } from "react";

interface SkillCardProps {
  name: string;
  icon: ReactNode;
  percentage: number;
}

export function SkillCard({ name, icon, percentage }: SkillCardProps) {
  return (
    <div className="bg-navy-800 rounded-lg p-4 flex flex-col items-center transition-transform duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 flex items-center justify-center bg-navy-950 rounded-full mb-2">
        {icon}
      </div>
      <h4 className="text-white text-center mb-1">{name}</h4>
      <div className="w-full h-1 bg-navy-950 rounded-full">
        <div 
          className="h-full bg-teal-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
