import { createAction } from '@reduxjs/toolkit';

export const selectString = (stringId) => async (dispatch) => {
  dispatch(createAction('SELECTE_STRING')({ stringId }));
};

export const updateString = (stringId, params) => async (dispatch) => {
  dispatch(createAction('UPDATE_STRING')({ stringId, params }));
};
