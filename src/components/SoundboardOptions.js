import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { updateSoundboardAngle } from '../actions/soundboardActions';

const SoundboardOptions = () => {
  const dispatch = useDispatch();
  const { angle } = useSelector((state) => state.soundboard);

  const [soundboardAngle, setSoundboardAngle] = useState(angle);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSoundboardAngle(parseInt(soundboardAngle)));
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

      <Button className='btn-sm' type='submit' variant='secondary' disabled={!soundboardAngle}>
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
