import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Arrow, Label, Tag, Text } from 'react-konva';
import { stringX, stringY, getQBezierValue } from '../utils';

const Measurements = ({ yOffset }) => {
  const { strings, defaultStringLengths, stringSpacing, stringNumber } = useSelector(
    (state) => state.string
  );
  const { control } = useSelector((state) => state.soundboard);

  const highestStringY = useMemo(() => {
    let yPos = 1000;

    strings.forEach((string, index) => {
      const yPosAtSoundboard = getQBezierValue(
        (index + 4) / (stringNumber + 7),
        stringY(-4, yOffset),
        control?.y,
        stringY(stringNumber + 3, yOffset)
      );

      const stringHeight = yPosAtSoundboard - string.length * 0.4;
      if (stringHeight < yPos) yPos = stringHeight;
    });

    return yPos;
  }, [strings, yOffset, control, stringNumber]);

  return (
    <>
      <Arrow
        points={[
          stringX(-4, stringSpacing) - 90,
          (highestStringY + stringY(-4, yOffset)) / 2 - 40,
          stringX(-4, stringSpacing) - 90,
          highestStringY - 50,
        ]}
        stroke='blue'
      />

      <Arrow
        points={[
          stringX(-4, stringSpacing) - 90,
          (highestStringY + stringY(-4, yOffset)) / 2 + 20,
          stringX(-4, stringSpacing) - 90,
          stringY(-4, yOffset),
        ]}
        stroke='blue'
      />

      <Label
        x={stringX(-4, stringSpacing) - 90}
        y={(highestStringY + stringY(-4, yOffset)) / 2 - 25}
        listening={false}
      >
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
          highestStringY - 80,
          stringX(stringNumber + 3, stringSpacing) + 20,
          highestStringY - 80,
        ]}
        stroke='blue'
      />

      <Arrow
        points={[
          stringX(-4, stringSpacing) + stringX(-4, stringSpacing) / 2 - 80,
          highestStringY - 80,
          stringX(-4, stringSpacing) - 30,
          highestStringY - 80,
        ]}
        stroke='blue'
      />

      <Label
        x={stringX(-4, stringSpacing) + stringX(-4, stringSpacing) / 2 + 30}
        y={highestStringY - 80}
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
