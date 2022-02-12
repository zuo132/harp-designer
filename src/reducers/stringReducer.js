import { createReducer } from '@reduxjs/toolkit';
import { stringData } from '../data';
import { inchToMeter, calculateTension, addNoteName } from '../utils';

const strings = addNoteName(stringData.reverse()).map((string, index, array) => {
  const x = array.length - index - 1;
  const length = 0.71 * x ** 2 + 7 * x + 100;

  return {
    ...string,
    length,
    diameter: inchToMeter(string.diameter) * 1000,
    tension: calculateTension(length / 1000, string.frequency, inchToMeter(string.diameter)),
    materialDensity: 1.14,
    linearMassDensity: 0,
  };
});

const initialState = {
  strings,
  defaultStringLengths: strings.map((string) => string.length),
  selectedString: null,
  stringSpacing: 10,
  materialDensity: 1.14,
  tuning: 'C Major',
  stringNumber: 36,
  lowestNote: 'C2',
  totalLoad: strings.reduce((acc, string) => acc + string.tension, 0),
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

    state.selectedString = stringToUpdate;
    state.totalLoad = state.strings.reduce((acc, string) => acc + string.tension, 0);
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
    if (state.selectedString)
      state.selectedString = state.strings.find((string) => string.id === state.selectedString.id);

    state.totalLoad = state.strings.reduce((acc, string) => acc + string.tension, 0);
  },

  UPDATE_TUNING: (state, { payload }) => {
    state.strings = addNoteName(state.strings, state.lowestNote, payload.tuning);
    state.strings.forEach((string) => {
      string.tension = calculateTension(
        string.length / 1000,
        string.frequency,
        string.diameter / 1000,
        string.materialDensity
      );
    });
    state.tuning = payload.tuning;
    if (state.selectedString)
      state.selectedString = state.strings.find((string) => string.id === state.selectedString.id);

    state.totalLoad = state.strings.reduce((acc, string) => acc + string.tension, 0);
  },

  UPDATE_STRING_NUMBER: (state, { payload }) => {
    let updatedStrings = state.strings;
    let updatedDefaultStringLengths = [];

    const difference = payload.stringNumber - state.stringNumber;
    if (difference > 0) {
      const newStrings = [];

      for (let i = 0; i < difference; i++) {
        const x = state.strings.length + i;
        const newString = {
          id: x + 1 + '',
          length: 0.71 * x ** 2 + 7 * x + 100,
          diameter: state.strings[0].diameter,
          materialDensity: state.materialDensity,
        };
        newStrings.push(newString);
      }

      updatedStrings = addNoteName(
        [...newStrings.reverse(), ...state.strings],
        state.lowestNote,
        state.tuning
      );

      updatedStrings = updatedStrings.map((string) => {
        const tension = calculateTension(
          string.length / 1000,
          string.frequency,
          string.diameter / 1000,
          string.materialDensity
        );

        return { ...string, tension };
      });

      updatedDefaultStringLengths = [
        ...newStrings.map((string) => string.length),
        ...state.defaultStringLengths,
      ];
    } else if (difference < 0) {
      updatedStrings = addNoteName(
        state.strings.slice(Math.abs(difference)),
        state.lowestNote,
        state.tuning
      ).map((string) => {
        const tension = calculateTension(
          string.length / 1000,
          string.frequency,
          string.diameter / 1000,
          string.materialDensity
        );

        return { ...string, tension };
      });

      updatedDefaultStringLengths = state.defaultStringLengths.slice(Math.abs(difference));
    }

    return {
      ...state,
      stringNumber: payload.stringNumber,
      strings: updatedStrings,
      defaultStringLengths: updatedDefaultStringLengths,
      totalLoad: state.strings.reduce((acc, string) => acc + string.tension, 0),
    };
  },

  UPDATE_LOWEST_NOTE: (state, { payload }) => {
    let updatedStrings = addNoteName(state.strings, payload.lowestNote, state.tuning);
    updatedStrings = updatedStrings.map((string) => {
      const tension = calculateTension(
        string.length / 1000,
        string.frequency,
        string.diameter / 1000,
        string.materialDensity
      );

      return { ...string, tension };
    });

    return {
      ...state,
      lowestNote: payload.lowestNote,
      strings: updatedStrings,
      totalLoad: updatedStrings.reduce((acc, string) => acc + string.tension, 0),
    };
  },
});

export default stringReducer;
