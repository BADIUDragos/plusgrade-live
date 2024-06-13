
import { ProductCharge } from "../interfaces/productChargeInterfaces.ts";
import { productChargeTag } from "./apiTagTypes";
import { baseApi } from "./baseApi";

const productChargesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductChargesByUUID: builder.query<ProductCharge[], string>({
      query: (UUID) => ({
        url: `productCharges/${UUID}/`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }),
      providesTags: (result, error, UUID) => [{ type: productChargeTag, id: UUID }],
    }),
  }),
});

export const { useGetProductChargesByUUIDQuery } = productChargesApi;
