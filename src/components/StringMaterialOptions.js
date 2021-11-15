import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updateStringMaterialDensity } from '../actions/stringActions';

const StringMaterialOptions = () => {
  const dispatch = useDispatch();

  const { materialDensity } = useSelector((state) => state.string);

  const updateMaterial = (density) => {
    dispatch(updateStringMaterialDensity(density));
  };

  return (
    <>
      <h5>String Material</h5>
      <Button
        className='m-3'
        variant={materialDensity === 1.14 ? 'primary' : 'secondary'}
        onClick={() => updateMaterial(1.14)}
      >
        Nylon
      </Button>
      <Button
        className='m-3'
        variant={materialDensity === 8.77 ? 'primary' : 'secondary'}
        onClick={() => updateMaterial(8.77)}
      >
        Brass
      </Button>
      <Button
        className='m-3'
        variant={materialDensity === 7.8 ? 'primary' : 'secondary'}
        onClick={() => updateMaterial(7.8)}
      >
        Steel
      </Button>
      <Button
        className='m-3'
        variant={materialDensity === 8.94 ? 'primary' : 'secondary'}
        onClick={() => updateMaterial(8.94)}
      >
        Copper
      </Button>
      <Button
        className='m-3'
        variant={materialDensity === 8.85 ? 'primary' : 'secondary'}
        onClick={() => updateMaterial(8.85)}
      >
        Phosphor Bronze
      </Button>
    </>
  );
};

export default StringMaterialOptions;
