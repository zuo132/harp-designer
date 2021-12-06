import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { updateLowestNote, updateStringNumber } from '../actions/stringActions';

const Overview = () => {
  const dispatch = useDispatch();
  const { strings, stringNumber, lowestNote } = useSelector((state) => state.string);
  let totalTension = 0;
  strings.forEach((string) => {
    totalTension += string.tension;
  });

  const [numberOfStrings, setNumberOfStrings] = useState(stringNumber);
  const [note, setNote] = useState(lowestNote);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note !== lowestNote) dispatch(updateLowestNote(note));
    if (parseInt(numberOfStrings) !== stringNumber)
      dispatch(updateStringNumber(parseInt(numberOfStrings)));
  };

  return (
    <>
      <h5>Overview</h5>

      <span>
        Total Tension: <b>{totalTension.toFixed(2)}</b> kg
      </span>
      <p></p>

      <Form onSubmit={handleSubmit}>
        <FormContainer>
          <Form.Group className='mb-3'>
            <Form.Label>Number of Strings</Form.Label>

            <Form.Control
              type='number'
              value={numberOfStrings}
              onChange={(e) => setNumberOfStrings(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Lowest Note</Form.Label>
            <Form.Control
              type='text'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </FormContainer>

        <Button className='btn-sm' type='submit' variant='secondary'>
          Apply
        </Button>
      </Form>
    </>
  );
};

export default Overview;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
