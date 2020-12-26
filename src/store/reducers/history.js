import {
  FETCH_CONVERSIONS_REQUEST,
  FETCH_CONVERSIONS_SUCCESS,
  FETCH_CONVERSIONS_FAILURE,
} from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  conversions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONVERSIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CONVERSIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        conversions: action.payload.conversions,
      };
    case FETCH_CONVERSIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
