import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Api/ApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSliceReducer from "./features/authSlice";
import favoriteSliceReducer from "./features/Favorite/favoriteSlice";
import cartSliceReducer from "./features/cartSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || [];
console.log(getFavoritesFromLocalStorage());
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        favorites: favoriteSliceReducer,
        cart: cartSliceReducer 
    },
    preloadedState: {
        favorites: initialFavorites
    },
    middleware: (GetDefaultMiddleware) => {
        return (
            GetDefaultMiddleware().concat(apiSlice.middleware));
    },
    devTools: true,
})
setupListeners(store.dispatch);
