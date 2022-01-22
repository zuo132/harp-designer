import { createAction } from '@reduxjs/toolkit';

export const updateNeckThickness = (thickness) => async (dispatch) => {
  dispatch(createAction('UPDATE_NECK_THICKNESS')({ thickness }));
};
