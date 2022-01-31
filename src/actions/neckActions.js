import { createAction } from '@reduxjs/toolkit';

export const updateNeckThickness = (thickness) => async (dispatch) => {
  dispatch(createAction('UPDATE_NECK_THICKNESS')({ thickness }));
};

export const updateTuningPinLength = (length) => async (dispatch) => {
  dispatch(createAction('UPDATE_TUNING_PIN_LENGTH')({ length }));
};
