import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

type Props = {};

export default async function page({}: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please log in to view this page"
        showReset={false}
      />
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations"
        subtitle="Looks like you have no reservations on your properties"
        showReset={false}
      />
    );
  }
  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
