import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-[2rem] font-dancing font-bold cursor-pointer">
        Raisinrich
      </span>
    </Link>
  );
};

export default Logo;
