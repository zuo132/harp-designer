import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { updateSoundboardAngle, updateStringBandThickness } from '../actions/soundboardActions';
import { calculateTensileStress } from '../utils';

const SoundboardOptions = () => {
  const dispatch = useDispatch();
  const { totalLoad } = useSelector((state) => state.string);
  const { angle, stringBandThickness, length } = useSelector((state) => state.soundboard);

  const [soundboardAngle, setSoundboardAngle] = useState(angle);
  const [bandThickness, setBandThickness] = useState(stringBandThickness);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (soundboardAngle && soundboardAngle !== angle)
      dispatch(updateSoundboardAngle(parseInt(soundboardAngle)));
    if (bandThickness && bandThickness !== stringBandThickness)
      dispatch(updateStringBandThickness(bandThickness));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h5>Soundboard</h5>

      <Form.Group className='mb-3'>
        <Form.Label>Soundboard Angle</Form.Label>
        <InputGroup>
          <Form.Control
            type='number'
            value={soundboardAngle}
            onChange={(e) => setSoundboardAngle(e.target.value)}
          ></Form.Control>
          <InputGroupText>&#176;</InputGroupText>
        </InputGroup>
      </Form.Group>

      <p>
        Tensile Stress:{' '}
        <b>
          {(
            calculateTensileStress(
              length / 1000,
              stringBandThickness / 1000,
              totalLoad * 0.5 * 9.807
            ) / 1000000
          ).toFixed(6)}
        </b>{' '}
        MPa
      </p>

      <Form.Group className='mb-3'>
        <Form.Label>String Band Thickness</Form.Label>
        <InputGroup>
          <Form.Control
            type='number'
            value={bandThickness}
            onChange={(e) => setBandThickness(e.target.value)}
          ></Form.Control>
          <InputGroupText>mm</InputGroupText>
        </InputGroup>
      </Form.Group>

      <Button className='btn-sm' type='submit' variant='secondary'>
        Apply
      </Button>
    </Form>
  );
};

export default SoundboardOptions;

const InputGroupText = styled(InputGroup.Text)`
  min-width: 70px;
  display: inline-block;
  text-align: center;
`;
