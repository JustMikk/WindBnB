import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export default function HeartButton({ listingId, currentUser }: Props) {
  const isFavourited = false;
  const toggleFavourite = () => {};
  return (
    <div
      className="relative hover:opacity-80 transiton cursor-pointer"
      onClick={toggleFavourite}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={isFavourited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}
