"use client";

import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";
import ReservationDialog, { type ReservationDialogHandle } from "./ReservationDialog";

const ReservationContext = createContext<() => void>(() => {});

/** Returns a function that opens the "Reserve a Table" popup. */
export function useOpenReservation() {
  return useContext(ReservationContext);
}

export default function ReservationProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<ReservationDialogHandle>(null);
  const open = useCallback(() => dialogRef.current?.open(), []);

  return (
    <ReservationContext.Provider value={open}>
      {children}
      <ReservationDialog ref={dialogRef} />
    </ReservationContext.Provider>
  );
}
