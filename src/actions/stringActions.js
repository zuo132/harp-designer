import { createAction } from '@reduxjs/toolkit';

export const selectString = (stringId) => async (dispatch) => {
  dispatch(createAction('SELECT_STRING')({ stringId }));
};

export const updateString = (stringId, params) => async (dispatch) => {
  dispatch(createAction('UPDATE_STRING')({ stringId, params }));
};

export const updateStringMaterialDensity = (density) => async (dispatch) => {
  dispatch(createAction('UPDATE_STRING_MATERIAL_DENSITY')({ density }));
};

export const updateTuning = (tuning) => async (dispatch) => {
  dispatch(createAction('UPDATE_TUNING')({ tuning }));
};

export const updateStringNumber = (stringNumber) => async (dispatch) => {
  dispatch(createAction('UPDATE_STRING_NUMBER')({ stringNumber }));
};

export const updateLowestNote = (lowestNote) => async (dispatch) => {
  dispatch(createAction('UPDATE_LOWEST_NOTE')({ lowestNote }));
};

export const updateYOffset = (yOffset) => async (dispatch) => {
  dispatch(createAction('UPDATE_Y_OFFSET')({ yOffset }));
};
