import { apiSlice } from "./ApiSlice";


const googleSlice = apiSlice.injectEndpoints({
    endpoints: (builders) => ({
        loginGoogle: builders.query({
            query: () => ({
                url: "http://localhost:5000/login/success",
            }),

        })
    })
})
export const { useLoginGoogleQuery } = googleSlice;
