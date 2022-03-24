import React from 'react';
import { useSelector } from 'react-redux';
import { Arrow, Label, Tag, Text } from 'react-konva';
import { stringX, stringY } from '../utils';

const Measurements = ({ yOffset, width, height }) => {
  const { stringSpacing, stringNumber } = useSelector((state) => state.string);

  return (
    <>
      <Arrow
        points={[
          stringX(-4, stringSpacing) - 90,
          height / 2 - 10,
          stringX(-4, stringSpacing) - 90,
          stringY(-4, yOffset, height) - height,
        ]}
        stroke='blue'
      />

      <Arrow
        points={[
          stringX(-4, stringSpacing) - 90,
          height / 2 + 40,
          stringX(-4, stringSpacing) - 90,
          stringY(-4, yOffset, height),
        ]}
        stroke='blue'
      />

      <Label x={stringX(-4, stringSpacing) - 90} y={height / 2} listening={false}>
        <Tag
          fill='black'
          pointerDirection='up'
          pointerWidth={0}
          pointerHeight={0}
          lineJoin='round'
        />
        <Text text={Math.round(height / 0.4) + ' mm'} fontSize={18} padding={5} fill='white' />
      </Label>

      <Arrow
        points={[
          stringX(-4, stringSpacing) +
            (stringX(stringNumber + 3, stringSpacing) - stringX(-4, stringSpacing)) / 2 +
            10,
          stringY(-4, yOffset, height) - height - 30,
          stringX(stringNumber + 3, stringSpacing) + 20,
          stringY(-4, yOffset, height) - height - 30,
        ]}
        stroke='blue'
      />

      <Arrow
        points={[
          stringX(-4, stringSpacing) +
            (stringX(stringNumber + 3, stringSpacing) - stringX(-4, stringSpacing)) / 2 -
            100,
          stringY(-4, yOffset, height) - height - 30,
          stringX(-4, stringSpacing) - 30,
          stringY(-4, yOffset, height) - height - 30,
        ]}
        stroke='blue'
      />

      <Label
        x={
          stringX(-4, stringSpacing) +
          (stringX(stringNumber + 3, stringSpacing) - stringX(-4, stringSpacing)) / 2
        }
        y={stringY(-4, yOffset, height) - height - 30}
        listening={false}
      >
        <Tag
          fill='black'
          pointerDirection='right'
          pointerWidth={0}
          pointerHeight={0}
          lineJoin='round'
        />
        <Text text={Math.round(width / 0.4) + ' mm'} fontSize={18} padding={5} fill='white' />
      </Label>
    </>
  );
};

export default Measurements;
