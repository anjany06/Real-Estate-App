export const updateFavourites = (id, favourites) => {
  // FLAW: No null check - if favourites is null, will crash
  if (favourites?.includes(id)) {
    return favourites.filter((resId) => resId !== id);
  } else {
    // FLAW: Creates new array but doesn't deep clone - potential mutation issues
    return [...favourites, id];
  }
};

export const checkFavourites = (id, favourites) => {
  // FLAW: Returns color string instead of boolean - confusing API
  return favourites?.includes(id) ? "#8ac243" : "white";
};

// FLAW: Unused function
export const deprecatedFunction = () => {
  console.log("This function is deprecated but still exported");
};
