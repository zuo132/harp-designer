import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { updatePillarShape } from "../actions/pillarAction";

const PillarOptions = () => {
  const dispatch = useDispatch();

  const { shape } = useSelector((state) => state.pillar);

  const updateShape = (shape) => {
    dispatch(updatePillarShape(shape));
  };

  return (
    <>
      <h5>Pillar Shape</h5>

      <StyledButton
        variant={shape === "Straight" ? "primary" : "secondary"}
        onClick={() => updateShape("Straight")}
      >
        Straight
      </StyledButton>
      <StyledButton
        variant={shape === "D Shape" ? "primary" : "secondary"}
        onClick={() => updateShape("D Shape")}
      >
        D Shape
      </StyledButton>
    </>
  );
};

export default PillarOptions;

const StyledButton = styled(Button)`
  margin-right: 1rem;
`;
