import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import SoundboardOptions from "./SoundboardOptions";
import PillarOptions from "./PillarOptions";
import TuningOptions from "./TuningOptions";
import StringMaterialOptions from "./StringMaterialOptions";
import StringOptions from "./StringOptions";

const OptionsPanel = () => {
  return (
    <MainContainer>
      <OptionsContainer>
        <SoundboardOptions />
      </OptionsContainer>

      <OptionsContainer>
        <PillarOptions />
      </OptionsContainer>

      <OptionsContainer>
        <TuningOptions />
      </OptionsContainer>

      <OptionsContainer>
        <StringMaterialOptions />
      </OptionsContainer>

      <OptionsContainer>
        <StringOptions />
      </OptionsContainer>
    </MainContainer>
  );
};

export default OptionsPanel;

const MainContainer = styled(Container)`
  max-height: 90vh;
  overflow: auto;
`;

const OptionsContainer = styled.div`
  margin-bottom: 1.3rem;
`;
