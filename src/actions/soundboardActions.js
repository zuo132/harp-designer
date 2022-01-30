import { createAction } from '@reduxjs/toolkit';

export const updateSoundboardAngle = (angle) => async (dispatch) => {
  dispatch(createAction('UPDATE_SOUNDBOARD_ANGLE')({ angle }));
};

export const updateControlPosition = (position) => async (dispatch) => {
  dispatch(createAction('UPDATE_CONTROL_POSITION')({ position }));
};

export const updateStringBandThickness = (thickness) => async (dispatch) => {
  dispatch(createAction('UPDATE_STRING_BAND_THICKNESS')({ thickness }));
};

export const updateSoundboardLength = (length) => async (dispatch) => {
  dispatch(createAction('UPDATE_SOUNDBOARD_LENGTH')({ length }));
};
