"use client";

import type { ComponentProps } from "react";
import { useOpenReservation } from "./ReservationProvider";

/** A plain <button> that opens the reservation popup; style it like any button. */
export default function ReserveButton({
  onClick,
  ...props
}: Omit<ComponentProps<"button">, "type">) {
  const openReservation = useOpenReservation();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(e) => {
        onClick?.(e);
        openReservation();
      }}
      {...props}
    />
  );
}
