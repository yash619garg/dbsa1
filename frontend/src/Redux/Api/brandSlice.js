import { brand_url } from "../constant";
import { apiSlice } from "./ApiSlice";


const brandSlice = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        createBrand: builders.mutation({
            query: (data) => ({
                url: `${brand_url}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Brand"]

        }),
        updateBrand: builders.mutation({
            query: ({ data, brandId }) => ({
                method: "PUT",
                url: `${brand_url}/${brandId}`,
                body: data
            }),
            invalidatesTags: ["Brand"]
        }),
        getAllBrand: builders.query({
            query: () => ({
                url: brand_url
            }),
            providesTags: ["Brand"],
            keepUnusedDataFor: 5,
        }),
        deleteBrand: builders.query({
            query: (brandId) => ({
                url: `${brand_url}/${brandId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Brand"]
        })
    })
})

export const { useCreateBrandMutation, useGetAllBrandQuery, useDeleteBrandQuery, useUpdateBrandMutation } = brandSlice;