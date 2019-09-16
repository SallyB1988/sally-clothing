import ShopActionTypes from './shop.types'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// THUNKS are action creators that return a function that gets a dispatch

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    // Redux will dispatch the fetchCollectionStart which changes the reducer state to be isFetching: true, then
    // it will begin the async request for collectionRef. This will complete with either success (fetchCollectionsSuccess)
    //  or failure (fetchCollectionsFailure)
    dispatch(fetchCollectionsStart());

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
  }
}