import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { updateTuningPinLength, updateNeckThickness } from '../actions/neckActions';
import { stringX, calculateTensileStress } from '../utils';

const NeckOptions = () => {
  const dispatch = useDispatch();
  const { stringSpacing, stringNumber, totalLoad } = useSelector((state) => state.string);
  const { neckThickness, tuningPinLength } = useSelector((state) => state.neck);

  const [thickness, setThickness] = useState(neckThickness);
  const [tuningPinLen, setTuningPinLen] = useState(tuningPinLength);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateNeckThickness(parseFloat(thickness)));
    dispatch(updateTuningPinLength(parseFloat(tuningPinLen)));
  };

  return (
    <>
      <h5>Neck</h5>

      <p>
        Tensile Stress:{' '}
        <b>
          {(
            calculateTensileStress(
              (stringX(stringNumber + 3, stringSpacing) + 20 - (stringX(-4, stringSpacing) - 30)) /
                0.4 /
                1000,
              neckThickness / 1000,
              totalLoad * 9.807
            ) / 1000000
          ).toFixed(6)}
        </b>{' '}
        MPa
      </p>

      <p>
        Torque: <b>{((tuningPinLength / 1000) * totalLoad * 9.807).toFixed(6)}</b> N m
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-1'>
          <Form.Label>Neck Thickness</Form.Label>
          <InputGroup>
            <Form.Control
              type='number'
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
            ></Form.Control>
            <InputGroupText>mm</InputGroupText>
          </InputGroup>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Tuning Pin Length</Form.Label>
          <InputGroup>
            <Form.Control
              type='number'
              value={tuningPinLen}
              onChange={(e) => setTuningPinLen(e.target.value)}
            ></Form.Control>
            <InputGroupText>mm</InputGroupText>
          </InputGroup>
        </Form.Group>

        <Button className='btn-sm' type='submit' variant='secondary'>
          Apply
        </Button>
      </Form>
    </>
  );
};

export default NeckOptions;

const InputGroupText = styled(InputGroup.Text)`
  min-width: 70px;
  display: inline-block;
  text-align: center;
`;
