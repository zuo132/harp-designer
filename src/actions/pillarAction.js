import { createAction } from '@reduxjs/toolkit';

export const updatePillarShape = (shape) => async (dispatch) => {
  dispatch(createAction('UPDATE_PILLAR_SHAPE')({ shape }));
};

export const updatePillarDiameter = (diameter) => async (dispatch) => {
  dispatch(createAction('UPDATE_PILLAR_DIAMETER')({ diameter }));
};

export const updatePillarWidth = (width) => async (dispatch) => {
  dispatch(createAction('UPDATE_PILLAR_WIDTH')({ width }));
};

export const updatePillarThickness = (thickness) => async (dispatch) => {
  dispatch(createAction('UPDATE_PILLAR_THICKNESS')({ thickness }));
};
