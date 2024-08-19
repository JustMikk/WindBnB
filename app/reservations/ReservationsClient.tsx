"use client";
import React, { useCallback, useState } from "react";
import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

type Props = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

export default function ReservationsClient({
  reservations,
  currentUser,
}: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
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
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            data={reservation.listing}
            key={reservation.id}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionId={reservation.id}
            currentUser={currentUser}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </Container>
  );
}
