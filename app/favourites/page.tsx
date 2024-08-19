import React from "react";
import EmptyState from "../components/EmptyState";
import { getFavouriteListings } from "../actions/getFavouriteListings";
import getCurrentUser from "../actions/getCurrentUser";
import FavouritesClient from "./FavouritesClient";

type Props = {};

export default async function page({}: Props) {
  const listings = await getFavouriteListings();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favourites found"
        subtitle="Looks like you haven't added any listings to your favourites yet."
      />
    );
  }

  return <FavouritesClient listings={listings} currentUser={currentUser} />;
}
