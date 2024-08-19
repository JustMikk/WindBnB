"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { start } from "repl";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import { on } from "events";
import Counter from "../inputs/Counter";

type Props = {};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal({}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
      dateRange,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    router,
    params,
    searchModal,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search";
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to stay?"
        subtitle="Find your perfect place"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you want to stay?"
          subtitle="Find your perfect place"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter
          title="Guests"
          subtitle="How many guests are you having"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
        ba
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
    />
  );
}
