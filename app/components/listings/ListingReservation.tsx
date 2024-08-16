import React from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

type Props = {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  disabledDates: Date[];
  onSubmit: () => void;
  disabled?: boolean;
  dateRange: Range;
};

export default function ListingReservation({
  price,
  totalPrice,
  onChangeDate,
  disabledDates,
  onSubmit,
  disabled,
  dateRange,
}: Props) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">per night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button label="Reserve" onClick={onSubmit} disabled={disabled} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
}
