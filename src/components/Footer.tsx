import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 text-[#8892B0]">
      <div className="text-center">
        <p className="mb-2">Designed & Built by Iyad Khalil</p>
        <p className="text-sm">© {currentYear} All Rights Reserved</p>
      </div>
    </footer>
  );
}
