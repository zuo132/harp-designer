import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { updateString } from '../actions/stringActions';
import { calculateTension } from '../utils';

const StringOptions = () => {
  const dispatch = useDispatch();
  const { selectedString } = useSelector((state) => state.string);

  const [length, setLength] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [tension, setTension] = useState(0);
  const [material, setMaterial] = useState(0);

  useEffect(() => {
    if (selectedString) {
      setLength(selectedString.length);
      setDiameter(selectedString.diameter);
      setTension(selectedString.tension);
      setMaterial(selectedString.materialDensity);
    }
  }, [selectedString]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTension = calculateTension(
      length / 1000,
      selectedString.frequency,
      diameter / 1000,
      material
    );

    dispatch(
      updateString(selectedString.id, {
        length,
        diameter,
        tension: newTension,
        materialDensity: material,
      })
    );
    setTension(newTension);
  };

  if (!selectedString) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <h5>String ({selectedString.note})</h5>

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

      <Form.Group className='mb-1'>
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

      <Form.Group className='mb-3'>
        <Form.Label>Material</Form.Label>
        <Form.Select
          aria-label='Default select example'
          value={material}
          onChange={(e) => setMaterial(parseFloat(e.target.value))}
        >
          <option value={1.14}>Nylon</option>
          <option value={8.77}>Brass</option>
          <option value={7.8}>Steel</option>
          <option value={8.94}>Copper</option>
          <option value={8.85}>Phosphor Bronze</option>
        </Form.Select>
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
