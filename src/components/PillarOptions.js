import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Form, InputGroup } from 'react-bootstrap';
import {
  updatePillarShape,
  updatePillarDiameter,
  updatePillarWidth,
  updatePillarThickness,
} from '../actions/pillarAction';

const PillarOptions = () => {
  const dispatch = useDispatch();

  const { totalLoad } = useSelector((state) => state.string);
  const { shape, pillarDiameter, pillarWidth, pillarThickness } = useSelector(
    (state) => state.pillar
  );

  const [diameter, setDiameter] = useState(pillarDiameter);
  const [width, setWidth] = useState(pillarWidth);
  const [thickness, setThickness] = useState(pillarThickness);

  const updateShape = (shape) => {
    dispatch(updatePillarShape(shape));
  };

  const updateDiameter = (e) => {
    e.preventDefault();
    dispatch(updatePillarDiameter(diameter));
  };

  const updateWidthAndThickness = (e) => {
    e.preventDefault();
    if (width && width !== pillarWidth) dispatch(updatePillarWidth(width));
    if (thickness && thickness !== pillarThickness) dispatch(updatePillarThickness(thickness));
  };

  const calculateCrossSectionArea = () => {
    if (shape === 'Straight') {
      return (pillarDiameter / 1000 / 2) ** 2 * Math.PI;
    } else {
      return (pillarWidth / 1000) * (pillarThickness / 1000);
    }
  };

  return (
    <>
      <h5>Pillar</h5>

      <StyledButton
        variant={shape === 'Straight' ? 'primary' : 'secondary'}
        onClick={() => updateShape('Straight')}
      >
        Straight
      </StyledButton>
      <StyledButton
        variant={shape === 'D Shape' ? 'primary' : 'secondary'}
        onClick={() => updateShape('D Shape')}
      >
        D Shape
      </StyledButton>

      <p>
        Compresive Stress:{' '}
        <b>{((totalLoad * 0.6 * 9.807) / calculateCrossSectionArea() / 1000000).toFixed(6)}</b> MPa
      </p>

      {shape === 'Straight' ? (
        <Form onSubmit={updateDiameter}>
          <Form.Group className='mb-3'>
            <Form.Label>Pillar Diameter</Form.Label>
            <InputGroup>
              <Form.Control
                type='number'
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
              ></Form.Control>
              <InputGroupText>mm</InputGroupText>
            </InputGroup>
          </Form.Group>

          <Button className='btn-sm' type='submit' variant='secondary' disabled={!diameter}>
            Apply
          </Button>
        </Form>
      ) : (
        <Form onSubmit={updateWidthAndThickness}>
          <Form.Group className='mb-1'>
            <Form.Label>Pillar Width</Form.Label>
            <InputGroup>
              <Form.Control
                type='number'
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              ></Form.Control>
              <InputGroupText>mm</InputGroupText>
            </InputGroup>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Pillar Thickness</Form.Label>
            <InputGroup>
              <Form.Control
                type='number'
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
              ></Form.Control>
              <InputGroupText>mm</InputGroupText>
            </InputGroup>
          </Form.Group>

          <Button className='btn-sm' type='submit' variant='secondary'>
            Apply
          </Button>
        </Form>
      )}
    </>
  );
};

export default PillarOptions;

const StyledButton = styled(Button)`
  margin: 0 1rem 1rem 0;
`;

const InputGroupText = styled(InputGroup.Text)`
  min-width: 70px;
  display: inline-block;
  text-align: center;
`;
