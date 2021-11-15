import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updatePillarShape } from '../actions/pillarAction';

const PillarOptions = () => {
  const dispatch = useDispatch();

  const { shape } = useSelector((state) => state.pillar);

  const updateShape = (shape) => {
    dispatch(updatePillarShape(shape));
  };

  return (
    <>
      <h5>Pillar Shape</h5>

      <Button
        className='mx-3'
        variant={shape === 'Straight' ? 'primary' : 'secondary'}
        onClick={() => updateShape('Straight')}
      >
        Straight
      </Button>
      <Button
        className='mx-3'
        variant={shape === 'D Shape' ? 'primary' : 'secondary'}
        onClick={() => updateShape('D Shape')}
      >
        D Shape
      </Button>
    </>
  );
};

export default PillarOptions;
