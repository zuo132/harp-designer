import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { updateLowestNote, updateStringNumber } from '../actions/stringActions';
import { getNoteNamesInScale } from '../utils';

const Overview = () => {
  const dispatch = useDispatch();
  const { strings, stringNumber, lowestNote, tuning } = useSelector((state) => state.string);
  let totalTension = 0;
  strings.forEach((string) => {
    totalTension += string.tension;
  });

  const [numberOfStrings, setNumberOfStrings] = useState(stringNumber);
  const [note, setNote] = useState(lowestNote);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (note !== lowestNote) {
      const noteNames = getNoteNamesInScale(tuning);

      const noteName = note.length === 3 ? note.substring(0, 2) : note.substring(0, 1);
      if (noteNames.includes(noteName)) {
        dispatch(updateLowestNote(note));
      } else {
        setErrorMessage('Invalid note, the valid notes are: ' + noteNames);
      }
    }
    if (parseInt(numberOfStrings) !== stringNumber) {
      dispatch(updateStringNumber(parseInt(numberOfStrings)));
    }
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
          <InputContainer className='mb-3'>
            <Form.Label>Number of Strings</Form.Label>

            <Form.Control
              type='number'
              value={numberOfStrings}
              onChange={(e) => setNumberOfStrings(e.target.value)}
            ></Form.Control>
          </InputContainer>

          <InputContainer className='mb-3'>
            <Form.Label>Lowest Note</Form.Label>

            <InputGroup hasValidation>
              <Form.Control
                type='text'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
                isInvalid={errorMessage}
              />
              <Form.Control.Feedback type='invalid'>{errorMessage}</Form.Control.Feedback>
            </InputGroup>
          </InputContainer>
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

const InputContainer = styled(Form.Group)`
  flex: 1;
`;
