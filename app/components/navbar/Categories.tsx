"use client";
import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

type Props = {};

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "Find your perfect beach home",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "Find your perfect Windmill home",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Find your perfect modern home",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Find your perfect countryside home",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Find your perfect pool home",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "Find your perfect island home",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "Find your perfect lake home",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "Find your perfect skiing home",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "Find your perfect castle home",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Find your perfect camping home",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "Find your perfect arctic home",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "Find your perfect cave home",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "Find your perfect desert home",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "Find your perfect barn home",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "Find your perfect luxurious home",
  },
];

export default function Categories({}: Props) {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
