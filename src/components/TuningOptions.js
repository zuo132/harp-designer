import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { updateTuning } from "../actions/stringActions";

const TuningOptions = () => {
  const dispatch = useDispatch();

  const { tuning } = useSelector((state) => state.string);

  const updateStringTuning = (tuning) => {
    dispatch(updateTuning(tuning));
  };

  return (
    <>
      <h5>Tuning</h5>

      <StyledButton
        variant={tuning === "C Major" ? "primary" : "secondary"}
        onClick={() => updateStringTuning("C Major")}
      >
        C Major
      </StyledButton>

      <StyledButton
        variant={tuning === "E Flat Major" ? "primary" : "secondary"}
        onClick={() => updateStringTuning("E Flat Major")}
      >
        E &#9837; Major
      </StyledButton>

      <StyledButton
        variant={tuning === "A Flat Major" ? "primary" : "secondary"}
        onClick={() => updateStringTuning("A Flat Major")}
      >
        A &#9837; Major
      </StyledButton>
    </>
  );
};

export default TuningOptions;

const StyledButton = styled(Button)`
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;
