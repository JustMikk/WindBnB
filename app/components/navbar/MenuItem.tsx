"use client";
import React from "react";
interface MenuItemProps {
  onClick: () => void;
  Label: String;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, Label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
    >
      {Label}
    </div>
  );
};

export default MenuItem;
