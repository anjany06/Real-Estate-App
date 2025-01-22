export const updateFavourites = (id, favourites) => {
  if (favourites?.includes(id)) {
    return favourites.filter((resId) => resId !== id);
  } else {
    return [...favourites, id];
  }
};
