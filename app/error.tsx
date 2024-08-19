"use client";
import React, { use, useEffect } from "react";
import EmptyState from "./components/EmptyState";

type Props = {
  error: Error;
};

export default function error({ error }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title="OOPS" subtitle="Something went wrong!" />;
}
