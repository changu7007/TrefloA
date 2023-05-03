import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="px-3 py-2 bg-blue-800 w-full text-gray-300 flex items-center justify-center">
      <h1 className="text-xs font-semibold text-gray-300">Pizza Town |</h1>
      <Link
        href="https://gagancgxv.website/"
        className="pl-2 text-xs font-semibold text-gray-300"
      >
        Designed By GCGXV
      </Link>
    </div>
  );
};

export default Footer;
