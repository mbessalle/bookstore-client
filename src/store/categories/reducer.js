import { FETCH_CATEGORIES } from "./actions";


const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return [...state, ...action.payload];

    default:
      return state;
  }
};