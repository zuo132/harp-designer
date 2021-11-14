import React, { useState } from 'react';
import { Stage, Layer, Circle } from 'react-konva';
import Body from './Body';
import Pillar from './Pillar';
import Neck from './Neck';
import String from './String';

const Harp = () => {
  const [stringSpacing, setStringSpacing] = useState(10);
  const [soundboardAngle, setSoundboardAngle] = useState(50);
  const [yOffset, setYOffset] = useState(calculateYOffset(soundboardAngle, stringSpacing));
  const [string, setString] = useState({
    id: '1',
    frequency: 1864.655,
    length: 80.0,
    tension: 6.661,
    diameter: 0.025,
  });

  return (
    <Stage width={window.innerWidth * 0.9} height={window.innerHeight * 0.9}>
      <Layer>
        <Body
          start={{ x: stringX(-4, stringSpacing), y: stringY(-4, yOffset) }}
          end={{ x: stringX(39, stringSpacing), y: stringY(39, yOffset) }}
        />
        <Pillar
          start={{ x: stringX(-4, stringSpacing), y: stringY(-4, yOffset) }}
          end={{ x: stringX(-4, stringSpacing), y: stringY(43, yOffset) }}
        />
        <Neck
          start={{ x: stringX(-4, stringSpacing), y: stringY(43, yOffset) }}
          end={{ x: stringX(39, stringSpacing), y: stringY(39, yOffset) }}
        />
        <String
          start={{ x: stringX(0, stringSpacing), y: stringY(0, yOffset) }}
          end={{ x: stringX(0, stringSpacing), y: stringY(0, yOffset) - string.length * 0.4 }}
          string={string}
        />
      </Layer>
    </Stage>
  );
};

export default Harp;

const stringX = (index, stringSpacing) => {
  return index * stringSpacing + 500;
};

const stringY = (index, scale) => {
  return 600 - index * scale;
};

// Angle in degrees
const calculateYOffset = (angle, stringSpacing) => {
  const radians = (angle * Math.PI) / 180;
  return stringSpacing * Math.tan(radians);
};
