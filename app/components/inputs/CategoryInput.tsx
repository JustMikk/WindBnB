import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onclick: (value: string) => void;
};

export default function CategoryInput({
  icon: Icon,
  label,
  selected,
  onclick,
}: Props) {
  return (
    <div
      onClick={() => {
        onclick(label);
      }}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-300"
      }`}
    >
      <Icon size={30} />
      <div className="font-semibold ">{label}</div>
    </div>
  );
}
