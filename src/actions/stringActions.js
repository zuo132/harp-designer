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
