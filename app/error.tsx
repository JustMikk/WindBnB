"use client";
import React, { use, useEffect } from "react";
import EmptyState from "./components/EmptyState";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title="OOPS!" subtitle="Something went wrong!" />;
}
