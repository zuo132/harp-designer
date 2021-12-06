import React from 'react';
import { useSelector } from 'react-redux';
import { Arrow, Label, Tag, Text } from 'react-konva';
import { stringX, stringY } from '../utils';

const Measurements = ({ yOffset }) => {
  const { defaultStringLengths, stringSpacing, stringNumber } = useSelector(
    (state) => state.string
  );

  return (
    <>
      <Arrow
        points={[
          stringX(-4, stringSpacing) - 90,
          stringY(-4, yOffset) / 2 - 20,
          stringX(-4, stringSpacing) - 90,
          stringY(-4, yOffset) - defaultStringLengths[0] * 0.48,
        ]}
        stroke='blue'
      />

      <Arrow
        points={[
          stringX(-4, stringSpacing) - 90,
          stringY(-4, yOffset) / 2 + 40,
          stringX(-4, stringSpacing) - 90,
          stringY(-4, yOffset),
        ]}
        stroke='blue'
      />

      <Label x={stringX(-4, stringSpacing) - 90} y={stringY(-4, yOffset) / 2} listening={false}>
        <Tag
          fill='black'
          pointerDirection='up'
          pointerWidth={0}
          pointerHeight={0}
          lineJoin='round'
        />
        <Text
          text={
            Math.round(
              ((stringY(-4, yOffset) - (stringY(-4, yOffset) - defaultStringLengths[0] * 0.48)) /
                0.4) *
                100
            ) /
              100 +
            ' mm'
          }
          fontSize={18}
          padding={5}
          fill='white'
        />
      </Label>

      <Arrow
        points={[
          stringX(-4, stringSpacing) + stringX(-4, stringSpacing) / 2 + 50,
          stringY(-4, yOffset) - defaultStringLengths[0] * 0.48 - 30,
          stringX(stringNumber + 3, stringSpacing) + 20,
          stringY(-4, yOffset) - defaultStringLengths[0] * 0.48 - 30,
        ]}
        stroke='blue'
      />

      <Arrow
        points={[
          stringX(-4, stringSpacing) + stringX(-4, stringSpacing) / 2 - 80,
          stringY(-4, yOffset) - defaultStringLengths[0] * 0.48 - 30,
          stringX(-4, stringSpacing) - 30,
          stringY(-4, yOffset) - defaultStringLengths[0] * 0.48 - 30,
        ]}
        stroke='blue'
      />

      <Label
        x={stringX(-4, stringSpacing) + stringX(-4, stringSpacing) / 2 + 30}
        y={stringY(-4, yOffset) - defaultStringLengths[0] * 0.48 - 30}
        listening={false}
      >
        <Tag
          fill='black'
          pointerDirection='right'
          pointerWidth={0}
          pointerHeight={0}
          lineJoin='round'
        />
        <Text
          text={
            Math.round(
              ((stringX(stringNumber + 3, stringSpacing) + 20 - (stringX(-4, stringSpacing) - 30)) /
                0.4) *
                100
            ) /
              100 +
            ' mm'
          }
          fontSize={18}
          padding={5}
          fill='white'
        />
      </Label>
    </>
  );
};

export default Measurements;
