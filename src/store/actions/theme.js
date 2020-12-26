import storageService from 'services/storage.service';
import { CHANGE_THEME } from '../actionTypes';

export const loadTheme = () => async (dispatch) => {
  const theme = storageService.getItem('theme');
  if (theme) {
    dispatch({
      type: CHANGE_THEME,
      payload: { theme },
    });
  }
};

export const changeTheme = (theme) => async (dispatch) => {
  storageService.setItem('theme', theme);

  dispatch({
    type: CHANGE_THEME,
    payload: { theme },
  });
};
