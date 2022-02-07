import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { updateString } from '../actions/stringActions';
import { calculateTension, calculateFrequency, calculateLength, calculateDiameter } from '../utils';

const StringOptions = () => {
  const dispatch = useDispatch();
  const { selectedString } = useSelector((state) => state.string);

  const [frequency, setFrequency] = useState(0);
  const [length, setLength] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [tension, setTension] = useState(0);
  const [material, setMaterial] = useState(0);
  const [lmd, setLmd] = useState(0);
  const [selectedField, setSelectField] = useState('tension');

  useEffect(() => {
    if (selectedString) {
      setFrequency(selectedString.frequency);
      setLength(selectedString.length);
      setDiameter(selectedString.diameter);
      setTension(selectedString.tension);
      setMaterial(selectedString.materialDensity);
      setLmd(selectedString.linearMassDensity);
    }
  }, [selectedString]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newFrequency = parseFloat(frequency),
      newLength = parseFloat(length),
      newDiameter = parseFloat(diameter),
      newTension = parseFloat(tension);

    switch (selectedField) {
      case 'frequency':
        newFrequency = calculateFrequency(
          length / 1000,
          tension,
          diameter / 1000,
          material,
          material ? 0 : lmd
        );
        break;
      case 'length':
        newLength =
          calculateLength(frequency, tension, diameter / 1000, material, material ? 0 : lmd) * 1000;
        break;
      case 'diameter':
        newDiameter = calculateDiameter(frequency, length / 1000, tension, material) * 1000;
        break;
      case 'tension':
        newTension = calculateTension(
          frequency,
          length / 1000,
          diameter / 1000,
          material,
          material ? 0 : lmd
        );
        break;
      default:
    }

    let params = {
      frequency: newFrequency,
      length: newLength,
      diameter: newDiameter,
      tension: newTension,
      materialDensity: material,
    };

    if (lmd) params = { ...params, linearMassDensity: parseFloat(lmd) };

    dispatch(updateString(selectedString.id, params));
  };

  if (!selectedString) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <h5>String ({selectedString.note})</h5>

      <Form.Group className='mb-1'>
        <Form.Label>Frequency</Form.Label>
        <InputGroup>
          <Form.Control
            type='number'
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            disabled={selectedField === 'frequency'}
          />
          <InputGroupText>Hz</InputGroupText>
          <RadioContainer>
            <Form.Check
              type='radio'
              checked={selectedField === 'frequency'}
              onChange={() => setSelectField('frequency')}
              name='stringinput'
            />
          </RadioContainer>
        </InputGroup>
      </Form.Group>

      <Form.Group className='mb-1'>
        <Form.Label>Length</Form.Label>
        <InputGroup>
          <Form.Control
            type='number'
            value={length}
            onChange={(e) => setLength(e.target.value)}
            disabled={selectedField === 'length'}
          />
          <InputGroupText>mm</InputGroupText>
          <RadioContainer>
            <Form.Check
              type='radio'
              checked={selectedField === 'length'}
              onChange={() => setSelectField('length')}
              name='stringinput'
            />
          </RadioContainer>
        </InputGroup>
      </Form.Group>

      {material !== 0 && (
        <Form.Group className='mb-1'>
          <Form.Label>Diameter</Form.Label>
          <InputGroup>
            <Form.Control
              type='number'
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              disabled={selectedField === 'diameter'}
            />
            <InputGroupText>mm</InputGroupText>
            <RadioContainer>
              <Form.Check
                type='radio'
                checked={selectedField === 'diameter'}
                onChange={() => setSelectField('diameter')}
                name='stringinput'
              />
            </RadioContainer>
          </InputGroup>
        </Form.Group>
      )}

      <Form.Group className='mb-1'>
        <Form.Label>Tension</Form.Label>
        <InputGroup>
          <Form.Control
            type='number'
            value={tension}
            onChange={(e) => setTension(e.target.value)}
            disabled={selectedField === 'tension'}
          />
          <InputGroupText>kg</InputGroupText>
          <RadioContainer>
            <Form.Check
              type='radio'
              checked={selectedField === 'tension'}
              onChange={() => setSelectField('tension')}
              name='stringinput'
            />
          </RadioContainer>
        </InputGroup>
      </Form.Group>

      <Form.Group className={material === 0 ? 'mb-1' : 'mb-3'}>
        <Form.Label>Material</Form.Label>
        <Form.Select
          aria-label='Default select example'
          value={material}
          onChange={(e) => {
            if (e.target.value === '0' && selectedField === 'diameter') {
              setSelectField('tension');
            }
            setMaterial(parseFloat(e.target.value));
          }}
        >
          <option value={1.14}>Nylon</option>
          <option value={8.77}>Brass</option>
          <option value={7.8}>Steel</option>
          <option value={8.94}>Copper</option>
          <option value={8.85}>Phosphor Bronze</option>
          <option value={0}>Other</option>
        </Form.Select>
      </Form.Group>

      {material === 0 && (
        <Form.Group className='mb-3'>
          <Form.Label>Linear Mass Density (mass/length)</Form.Label>
          <InputGroup>
            <Form.Control type='number' value={lmd} onChange={(e) => setLmd(e.target.value)} />
            <InputGroupText>kg/m</InputGroupText>
          </InputGroup>
        </Form.Group>
      )}

      <Button
        className='btn-sm'
        type='submit'
        variant='secondary'
        disabled={
          !(
            (frequency || selectedField === 'frequency') &&
            (length || selectedField === 'length') &&
            (diameter || selectedField === 'diameter') &&
            (tension || selectedField === 'tension')
          )
        }
      >
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

const RadioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;
