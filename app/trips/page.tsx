import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

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

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations"
        subtitle="You have no reservations at this time"
        showReset={false}
      />
    );
  }
  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
