import { category_url } from "../constant";
import { apiSlice } from "./ApiSlice";


const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        createCategory: builders.mutation({
            query: (data) => ({
                url: `${category_url}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Category"]

        }),
        updateCategory: builders.mutation({
            query: ({ data, categoryId }) => ({
                method: "PUT",
                url: `${category_url}/${categoryId}`,
                body: data
            }),
            invalidatesTags: ["Category"]
        }),
        getAllCategory: builders.query({
            query: () => ({
                url: category_url
            }),
            providesTags: ["Category"],
            keepUnusedDataFor: 5,
        }),
        deleteCategory: builders.query({
            query: (categoryId) => ({
                url: `${category_url}/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"]
        })
    })
})

export const { useCreateCategoryMutation, useGetAllCategoryQuery, useDeleteCategoryQuery, useUpdateCategoryMutation } = categorySlice;