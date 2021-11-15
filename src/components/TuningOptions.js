import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updateTuning } from '../actions/stringActions';

const TuningOptions = () => {
  const dispatch = useDispatch();

  const { tuning } = useSelector((state) => state.string);

  const updateStringTuning = (tuning) => {
    dispatch(updateTuning(tuning));
  };

  return (
    <>
      <h5>Tuning</h5>

      <Button
        className='mx-3'
        variant={tuning === 'C Major' ? 'primary' : 'secondary'}
        onClick={() => updateStringTuning('C Major')}
      >
        C Major
      </Button>
      <Button
        className='mx-3'
        variant={tuning === 'E Flat Major' ? 'primary' : 'secondary'}
        onClick={() => updateStringTuning('E Flat Major')}
      >
        E &#9837; Major
      </Button>
      <Button
        className='mx-3'
        variant={tuning === 'A Flat Major' ? 'primary' : 'secondary'}
        onClick={() => updateStringTuning('A Flat Major')}
      >
        A &#9837; Major
      </Button>
    </>
  );
};

export default TuningOptions;
