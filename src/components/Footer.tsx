import React from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-6 text-center text-[#8892B0]">
      <div>
        <p className="mb-2">Designed & Built by Iyad Khalil</p>
        <p className="text-sm">© {currentYear} All Rights Reserved</p>
      </div>
    </footer>
  );
}
