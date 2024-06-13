import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../functions/baseQueries";
import { productChargeTag, reservationTag } from "./apiTagTypes";

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [productChargeTag, reservationTag],
  endpoints: () => ({}),
})