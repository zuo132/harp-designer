import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import {
  updateTuningPinLength,
  updateNeckThickness,
  updateParaguayanParams,
} from '../actions/neckActions';
import { stringX, calculateTensileStress } from '../utils';

const NeckOptions = () => {
  const dispatch = useDispatch();
  const { strings, stringSpacing, stringNumber, totalLoad } = useSelector((state) => state.string);
  const {
    neckThickness,
    tuningPinLength,
    frontNeckThickness,
    frontNeckTuningPostLength,
    backNeckThickness,
    backNeckTuningPostLength,
  } = useSelector((state) => state.neck);

  const [neckStyle, setNeckStyle] = useState('Standard');
  const [thickness, setThickness] = useState(neckThickness);
  const [tuningPinLen, setTuningPinLen] = useState(tuningPinLength);
  const [frontThickness, setFrontThickness] = useState(frontNeckThickness);
  const [frontTuningPostLength, setFrontTuningPostLength] = useState(frontNeckTuningPostLength);
  const [backThickness, setBackThickness] = useState(backNeckThickness);
  const [backTuningPostLength, setBackTuningPostLength] = useState(backNeckTuningPostLength);

  const frontNeckLoad = useMemo(() => {
    let load = 0;
    [...strings].reverse().forEach((string, index) => {
      if (index % 2 === 0) load += string.tension;
    });

    return load;
  }, [strings]);

  const backNeckLoad = useMemo(() => {
    let load = 0;
    [...strings].reverse().forEach((string, index) => {
      if (index % 2 === 1) load += string.tension;
    });

    return load;
  }, [strings]);

  const torqueImbalance = useMemo(() => {
    const imbalance =
      (frontNeckTuningPostLength / 1000) * frontNeckLoad * 9.807 -
      (backNeckTuningPostLength / 1000) * backNeckLoad * 9.807;

    return imbalance;
  }, [frontNeckTuningPostLength, backNeckTuningPostLength, frontNeckLoad, backNeckLoad]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (neckStyle === 'Standard') {
      dispatch(updateNeckThickness(parseFloat(thickness)));
      dispatch(updateTuningPinLength(parseFloat(tuningPinLen)));
    } else if (neckStyle === 'Paraguayan') {
      dispatch(
        updateParaguayanParams({
          frontNeckThickness: frontThickness,
          frontNeckTuningPostLength: frontTuningPostLength,
          backNeckThickness: backThickness,
          backNeckTuningPostLength: backTuningPostLength,
        })
      );
    }
  };

  return (
    <>
      <h5>Neck</h5>

      <StyledButton
        variant={neckStyle === 'Standard' ? 'primary' : 'secondary'}
        onClick={() => setNeckStyle('Standard')}
      >
        Standard
      </StyledButton>
      <StyledButton
        variant={neckStyle === 'Paraguayan' ? 'primary' : 'secondary'}
        onClick={() => setNeckStyle('Paraguayan')}
      >
        Paraguayan
      </StyledButton>

      <Form onSubmit={handleSubmit}>
        {neckStyle === 'Standard' && (
          <>
            <p>
              Tensile Stress:{' '}
              <b>
                {(
                  calculateTensileStress(
                    (stringX(stringNumber + 3, stringSpacing) +
                      20 -
                      (stringX(-4, stringSpacing) - 30)) /
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
          </>
        )}

        {neckStyle === 'Paraguayan' && (
          <>
            <OverlayTrigger
              placement='right'
              overlay={
                <Tooltip id='torque-imbalance-tooltip'>
                  Front neck torque is {Math.abs(torqueImbalance).toFixed(6)} Nm{' '}
                  {torqueImbalance > 0 ? 'greater' : 'less'} than back neck torque
                </Tooltip>
              }
            >
              <BlockSpan>
                Torque Imbalance <b>{torqueImbalance.toFixed(6)}</b> N m
              </BlockSpan>
            </OverlayTrigger>

            <p>
              <b>Front Neck</b>
            </p>

            <p>
              Tensile Stress:{' '}
              <b>
                {(
                  calculateTensileStress(
                    (stringX(stringNumber + 3, stringSpacing) +
                      20 -
                      (stringX(-4, stringSpacing) - 30)) /
                      0.4 /
                      1000,
                    frontNeckThickness / 1000,
                    (frontNeckLoad / 2) * 9.807
                  ) / 1000000
                ).toFixed(6)}
              </b>{' '}
              MPa
            </p>

            <Form.Group className='mb-1'>
              <Form.Label>Neck Thickness</Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  value={frontThickness}
                  onChange={(e) => setFrontThickness(e.target.value)}
                ></Form.Control>
                <InputGroupText>mm</InputGroupText>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Tuning Post Length</Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  value={frontTuningPostLength}
                  onChange={(e) => setFrontTuningPostLength(e.target.value)}
                ></Form.Control>
                <InputGroupText>mm</InputGroupText>
              </InputGroup>
            </Form.Group>

            <p>
              <b>Back Neck</b>
            </p>

            <p>
              Tensile Stress:{' '}
              <b>
                {(
                  calculateTensileStress(
                    (stringX(stringNumber + 3, stringSpacing) +
                      20 -
                      (stringX(-4, stringSpacing) - 30)) /
                      0.4 /
                      1000,
                    backNeckThickness / 1000,
                    (backNeckLoad / 2) * 9.807
                  ) / 1000000
                ).toFixed(6)}
              </b>{' '}
              MPa
            </p>

            <Form.Group className='mb-1'>
              <Form.Label>Neck Thickness</Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  value={backThickness}
                  onChange={(e) => setBackThickness(e.target.value)}
                ></Form.Control>
                <InputGroupText>mm</InputGroupText>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Tuning Post Length</Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  value={backTuningPostLength}
                  onChange={(e) => setBackTuningPostLength(e.target.value)}
                ></Form.Control>
                <InputGroupText>mm</InputGroupText>
              </InputGroup>
            </Form.Group>
          </>
        )}

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

const StyledButton = styled(Button)`
  margin: 0 1rem 1rem 0;
`;

const BlockSpan = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
`;
