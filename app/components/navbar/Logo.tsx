"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      src="/images/windbnb.png"
      alt="logo"
      width={100}
      height={100}
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
