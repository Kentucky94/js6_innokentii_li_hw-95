import {FETCH_COCKTAILS_SUCCESS, FETCH_SINGLE_COCKTAILS_SUCCESS} from "../actions/cocktailsActions";

const initialState = {
  cocktails: [],
  cocktail: {},
};

const cocktailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COCKTAILS_SUCCESS:
      return {...state, cocktails: action.cocktails};
    case FETCH_SINGLE_COCKTAILS_SUCCESS:
      return {...state, cocktail: action.cocktail};
    default:
      return state;
  }
};

export default cocktailsReducer;