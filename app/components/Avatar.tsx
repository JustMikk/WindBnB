import React from "react";
import Image from "next/image";
const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      alt="Avatar"
      src="/images/placeholder.jpg"
      height={30}
      width={30}
    />
  );
};

export default Avatar;
