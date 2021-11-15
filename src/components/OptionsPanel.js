import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import SoundboardOptions from './SoundboardOptions';
import PillarOptions from './PillarOptions';
import TuningOptions from './TuningOptions';
import StringMaterialOptions from './StringMaterialOptions';
import StringOptions from './StringOptions';

const OptionsPanel = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default OptionsPanel;

const OptionsContainer = styled.div`
  margin-bottom: 1.3rem;
`;
