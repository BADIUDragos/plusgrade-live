import { ReservationCharge } from "./reservationChargeInterfaces";

export interface ReservationState {
    reservation_uuid: string;
    numberOfActiveCharges: number;
    sumOfActiveCharges: number;
    reservationCharges: ReservationCharge[];
  }