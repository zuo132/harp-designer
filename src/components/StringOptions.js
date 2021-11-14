import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { updateString } from '../actions/stringActions';

const StringOptions = () => {
  const dispatch = useDispatch();
  const { selectedString } = useSelector((state) => state.string);

  const [length, setLength] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [tension, setTension] = useState(0);

  useEffect(() => {
    if (selectedString) {
      setLength(selectedString.length);
      setDiameter(selectedString.diameter);
      setTension(selectedString.tension);
    }
  }, [selectedString]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateString(selectedString.id, { length, diameter, tension }));
  };

  if (!selectedString) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <h5>String</h5>
      <Form.Group className='mb-1'>
        <Form.Label>Frequency</Form.Label>
        <InputGroup>
          <Form.Control type='number' value={selectedString.frequency} disabled />
          <InputGroupText>Hz</InputGroupText>
        </InputGroup>
      </Form.Group>

      <Form.Group className='mb-1'>
        <Form.Label>Length</Form.Label>
        <InputGroup>
          <Form.Control type='number' value={length} onChange={(e) => setLength(e.target.value)} />
          <InputGroupText>mm</InputGroupText>
        </InputGroup>
      </Form.Group>

      <Form.Group className='mb-1'>
        <Form.Label>Diameter</Form.Label>
        <InputGroup>
          <Form.Control
            type='number'
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
          />
          <InputGroupText>mm</InputGroupText>
        </InputGroup>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Tension</Form.Label>
        <InputGroup>
          <Form.Control
            type='number'
            value={tension}
            onChange={(e) => setTension(e.target.value)}
          />
          <InputGroupText>kg</InputGroupText>
        </InputGroup>
      </Form.Group>

      <Button className='btn-sm' type='submit' variant='secondary'>
        Apply
      </Button>
    </Form>
  );
};

export default StringOptions;

const InputGroupText = styled(InputGroup.Text)`
  min-width: 70px;
  display: inline-block;
  text-align: center;
`;
