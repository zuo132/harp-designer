import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { updateStringMaterialDensity } from "../actions/stringActions";

const StringMaterialOptions = () => {
  const dispatch = useDispatch();

  const { materialDensity } = useSelector((state) => state.string);

  const updateMaterial = (density) => {
    dispatch(updateStringMaterialDensity(density));
  };

  return (
    <>
      <h5>String Material</h5>

      <StyledButton
        variant={materialDensity === 1.14 ? "primary" : "secondary"}
        onClick={() => updateMaterial(1.14)}
      >
        Nylon
      </StyledButton>

      <StyledButton
        variant={materialDensity === 8.77 ? "primary" : "secondary"}
        onClick={() => updateMaterial(8.77)}
      >
        Brass
      </StyledButton>

      <StyledButton
        variant={materialDensity === 7.8 ? "primary" : "secondary"}
        onClick={() => updateMaterial(7.8)}
      >
        Steel
      </StyledButton>

      <StyledButton
        variant={materialDensity === 8.94 ? "primary" : "secondary"}
        onClick={() => updateMaterial(8.94)}
      >
        Copper
      </StyledButton>

      <StyledButton
        variant={materialDensity === 8.85 ? "primary" : "secondary"}
        onClick={() => updateMaterial(8.85)}
      >
        Phosphor Bronze
      </StyledButton>
    </>
  );
};

export default StringMaterialOptions;

const StyledButton = styled(Button)`
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;
