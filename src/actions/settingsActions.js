import { createAction } from '@reduxjs/toolkit';

export const updateBackgroundColor = (color) => async (dispatch) => {
  dispatch(createAction('UPDATE_BACKGROUND_COLOR')({ color }));
};

export const saveCurrentDesign = (designName, designData) => async () => {
  const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns'));
  localStorage.setItem(
    'savedDesigns',
    JSON.stringify({ ...savedDesigns, [designName]: designData })
  );
};

export const loadSavedDesign = (designName) => async (dispatch) => {
  const design = JSON.parse(localStorage.getItem('savedDesigns'))[designName];
  dispatch(createAction('UPDATE_STRING_STATE')({ state: design.string }));
  dispatch(createAction('UPDATE_NECK_STATE')({ state: design.neck }));
  dispatch(createAction('UPDATE_PILLAR_STATE')({ state: design.pillar }));
  dispatch(createAction('UPDATE_SOUNDBOARD_STATE')({ state: design.soundboard }));
};
