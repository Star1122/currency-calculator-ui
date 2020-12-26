import { parse } from 'utils';
import convertService from 'services/convert.service';
import {
  FETCH_RATES_REQUEST,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAILURE,
  SAVE_CONVERSION_REQUEST,
  SAVE_CONVERSION_SUCCESS,
  SAVE_CONVERSION_FAILURE,
} from '../actionTypes';

export const getDailyRates = () => async (dispatch) => {
  dispatch({
    type: FETCH_RATES_REQUEST,
  });

  try {
    const response = await convertService.getDailyRates();

    if (response.rates) {
      const data = await parse(response.rates);

      dispatch({
        type: FETCH_RATES_SUCCESS,
        payload: {
          rates: {
            ...data[0].rates,
            EUR: 1,
          },
        },
      });
    }

    dispatch({
      type: FETCH_RATES_FAILURE,
    });
  } catch (e) {
    dispatch({
      type: FETCH_RATES_FAILURE,
    });

    throw e;
  }
};

export const saveConversion = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_CONVERSION_REQUEST,
  });

  try {
    await convertService.saveConversion(data);

    dispatch({
      type: SAVE_CONVERSION_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: SAVE_CONVERSION_FAILURE,
    });

    throw e;
  }
};
