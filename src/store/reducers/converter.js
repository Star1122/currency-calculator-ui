import {
  FETCH_RATES_REQUEST,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAILURE,
  SAVE_CONVERSION_REQUEST,
  SAVE_CONVERSION_SUCCESS,
  SAVE_CONVERSION_FAILURE,
} from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isSaving: false,
  rates: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RATES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_RATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rates: action.payload.rates,
      };
    case FETCH_RATES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case SAVE_CONVERSION_REQUEST:
      return {
        ...state,
        isSaving: true,
      };
    case SAVE_CONVERSION_SUCCESS:
    case SAVE_CONVERSION_FAILURE:
      return {
        ...state,
        isSaving: false,
      };

    default:
      return state;
  }
};
