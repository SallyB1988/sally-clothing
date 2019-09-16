import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

// map over keys to return an array of objects  (each object contains
// the data for hats, jackets, sneakers, womens, mens)
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => (collections ? Object.keys(collections).map(key => collections[key]) :
    [])
)

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  )