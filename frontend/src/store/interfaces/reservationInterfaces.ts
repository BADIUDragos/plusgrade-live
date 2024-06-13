import { ProductCharge } from "./productChargeInterfaces";

export interface ReservationState {
    reservation_uuid: string;
    numberOfActiveCharges: number;
    sumOfActiveCharges: number;
    productCharges: ProductCharge[];
  }