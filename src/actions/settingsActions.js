import { createAction } from '@reduxjs/toolkit';

export const updateBackgroundColor = (color) => async (dispatch) => {
  dispatch(createAction('UPDATE_BACKGROUND_COLOR')({ color }));
};
