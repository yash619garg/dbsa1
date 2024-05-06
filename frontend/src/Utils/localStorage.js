// add product in localStorage
export const addProductInLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    console.log(favorites);
    if (!favorites.some((f) => f._id === product._id)) {
        favorites.push(product);
        // console.log(favorites);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

// remove product from localStorage

export const removeProductFromLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    const newFavorites = favorites.filter((f) => f._id !== product._id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
}
// // get favorites from localStorage

export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    // console.log(favoritesJSON);
    return favoritesJSON ? JSON.parse(favoritesJSON) : []
}
