import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 text-center text-slate-500">
      <div>
        <p className="mb-2">Designed & Built by Iyad Khalil</p>
        <p className="text-sm">© {currentYear} All Rights Reserved</p>
      </div>
    </footer>
  );
}
