import { createReducer } from '@reduxjs/toolkit';
import { stringData } from '../data';
import { inchToMeter, calculateTension } from '../utils';

const initialState = {
  strings: stringData.map((string) => {
    return {
      ...string,
      diameter: inchToMeter(string.diameter) * 1000,
      tension: calculateTension(
        string.length / 1000,
        string.frequency,
        inchToMeter(string.diameter)
      ),
    };
  }),
  selectedString: null,
  stringSpacing: 10,
  materialDensity: 1.14,
};

const stringReducer = createReducer(initialState, {
  SELECT_STRING: (state, { payload }) => {
    const selectedString = state.strings.find((string) => string.id === payload.stringId);
    return { ...state, selectedString };
  },

  UPDATE_STRING: (state, { payload }) => {
    const stringToUpdate = state.strings.find((string) => string.id === payload.stringId);

    Object.keys(payload.params).forEach((key) => {
      stringToUpdate[key] = payload.params[key];
    });
  },

  UPDATE_STRING_MATERIAL_DENSITY: (state, { payload }) => {
    state.strings.forEach((string) => {
      string.tension = calculateTension(
        string.length / 1000,
        string.frequency,
        string.diameter / 1000,
        payload.density
      );
    });

    state.materialDensity = payload.density;
    state.selectedString = state.strings.find((string) => string.id === state.selectedString.id);
  },
});

export default stringReducer;
