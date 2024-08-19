"use client";
import React, { useCallback, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ListingCard from "../components/listings/ListingCard";

type Props = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export default function PropertiesClient({ listings, currentUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subtitle="List of all your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            key={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionId={listing.id}
            currentUser={currentUser}
            actionLabel="Delete listing"
          />
        ))}
      </div>
    </Container>
  );
}
