import React from 'react';
import { Container } from 'react-bootstrap';
import SoundboardOptions from './SoundboardOptions';
import PillarOptions from './PillarOptions';
import TuningOptions from './TuningOptions';
import StringOptions from './StringOptions';

const OptionsPanel = () => {
  return (
    <Container>
      <SoundboardOptions />
      <PillarOptions />
      <TuningOptions />
      <StringOptions />
    </Container>
  );
};

export default OptionsPanel;
