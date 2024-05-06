import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: ({
        addToFavorite: (state, action) => {
            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFromProduct: (state, action) => {
            return state.filter((product) => product._id !== action.payload._id);

        },
        setFavorites: (state, action) => {
            // set the favorites from local storage
            return action.payload;
            // it is equivalent to state = action.payload
        }
    })
})

export const { addToFavorite, removeFromProduct, setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;