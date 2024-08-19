import React from "react";
import Container from "../components/Container";
import { SafeListing, SafeUser } from "../types";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

type Props = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export default function FavouritesClient({ listings, currentUser }: Props) {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of places you've added to your favourites"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            key={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
