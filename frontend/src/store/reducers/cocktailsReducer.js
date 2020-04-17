import {FETCH_COCKTAILS_SUCCESS} from "../actions/cocktailsActions";

const initialState = {
  cocktails: []
};

const cocktailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COCKTAILS_SUCCESS:
      return {...state, cocktails: action.cocktails};
    default:
      return state;
  }
};

export default cocktailsReducer;