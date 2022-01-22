import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { updateNeckThickness } from '../actions/neckActions';
import { stringX, calculateTensileStress } from '../utils';

const NeckOptions = () => {
  const dispatch = useDispatch();
  const { strings, stringSpacing, stringNumber } = useSelector((state) => state.string);
  const { neckThickness } = useSelector((state) => state.neck);
  let totalTension = 0;
  strings.forEach((string) => {
    totalTension += string.tension;
  });

  const [thickness, setThickness] = useState(neckThickness);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateNeckThickness(parseInt(thickness)));
  };

  return (
    <>
      <h5>Neck</h5>

      <span>
        Tensile Stress:{' '}
        <b>
          {(
            calculateTensileStress(
              (((stringX(stringNumber + 3, stringSpacing) +
                20 -
                (stringX(-4, stringSpacing) - 30)) /
                0.4) *
                100) /
                100 /
                1000,
              neckThickness / 1000,
              totalTension * 9.807
            ) / 1000000
          ).toFixed(6)}
        </b>{' '}
        MPa
      </span>
      <p></p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
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

        <Button className='btn-sm' type='submit' variant='secondary' disabled={!thickness}>
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
