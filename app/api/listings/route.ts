import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    title,
    description,
    price,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    imageSrc,
  } = body;
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      imageSrc,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
