import { ReservationState } from "../interfaces/reservationInterfaces";
import { reservationTag } from "./apiTagTypes";
import { baseApi } from "./baseApi";


const reservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listReservations: builder.query<ReservationState[], void>({
      query: () => ({
        url: "reservations",
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ reservation_uuid }) =>
                  ({ type: reservationTag, id: reservation_uuid } as const)
              ),
              { type: reservationTag, id: "LIST" },
            ]
          : [{ type: reservationTag, id: "LIST" }],
    }),
  }),
});

export const { useListReservationsQuery } = reservationApi;
