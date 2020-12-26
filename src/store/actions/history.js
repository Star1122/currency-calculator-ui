import { DateTime } from 'luxon';

import historyService from 'services/history.service';
import {
  FETCH_CONVERSIONS_REQUEST,
  FETCH_CONVERSIONS_SUCCESS,
  FETCH_CONVERSIONS_FAILURE,
} from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const getConversions = () => async (dispatch) => {
  dispatch({
    type: FETCH_CONVERSIONS_REQUEST,
  });

  try {
    const { conversions } = await historyService.getConversions();

    dispatch({
      type: FETCH_CONVERSIONS_SUCCESS,
      payload: {
        conversions: conversions
          .map((conversion) => ({
            ...conversion,
            calculated_amount: conversion.amount * conversion.rate,
            date: DateTime.fromISO(conversion.created_at).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS),
          }))
          .sort((a, b) => b.id - a.id),
      },
    });
  } catch (e) {
    dispatch({
      type: FETCH_CONVERSIONS_FAILURE,
    });

    throw e;
  }
};
