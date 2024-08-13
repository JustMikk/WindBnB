import React from "react";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}
const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
      height={30}
      width={30}
    />
  );
};

export default Avatar;
