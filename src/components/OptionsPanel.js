import React from 'react';
import { Container } from 'react-bootstrap';
import SoundboardOptions from './SoundboardOptions';
import PillarOptions from './PillarOptions';
import TuningOptions from './TuningOptions';
import StringMaterialOptions from './StringMaterialOptions';
import StringOptions from './StringOptions';

const OptionsPanel = () => {
  return (
    <Container>
      <SoundboardOptions />
      <PillarOptions />
      <TuningOptions />
      <StringMaterialOptions />
      <StringOptions />
    </Container>
  );
};

export default OptionsPanel;
