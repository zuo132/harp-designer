import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Arrow, Label, Tag, Text } from 'react-konva';
import { stringX, stringY, getQBezierValue } from '../utils';

const Measurements = ({ yOffset, width, height }) => {
  const { strings, stringSpacing, stringNumber } = useSelector((state) => state.string);
  const { control } = useSelector((state) => state.soundboard);

  const highestStringY = useMemo(() => {
    let yPos = 1000;

    strings.forEach((string, index) => {
      const yPosAtSoundboard = getQBezierValue(
        (index + 4) / (stringNumber + 7),
        stringY(-4, yOffset, height),
        control?.y,
        stringY(stringNumber + 3, yOffset, height)
      );

      const stringHeight = yPosAtSoundboard - string.length * 0.4;
      if (stringHeight < yPos) yPos = stringHeight;
    });

    return yPos;
  }, [strings, yOffset, control, stringNumber, height]);

  return (
    <>
      <Arrow
        points={[
          stringX(-4, stringSpacing) - 90,
          (highestStringY + stringY(-4, yOffset, height)) / 2 - 40,
          stringX(-4, stringSpacing) - 90,
          highestStringY - 50,
        ]}
        stroke='blue'
      />

      <Arrow
        points={[
          stringX(-4, stringSpacing) - 90,
          (highestStringY + stringY(-4, yOffset, height)) / 2 + 20,
          stringX(-4, stringSpacing) - 90,
          stringY(-4, yOffset, height),
        ]}
        stroke='blue'
      />

      <Label
        x={stringX(-4, stringSpacing) - 90}
        y={(highestStringY + stringY(-4, yOffset, height)) / 2 - 25}
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
          text={Math.round((height / 0.4) * 100) / 100 + ' mm'}
          fontSize={18}
          padding={5}
          fill='white'
        />
      </Label>

      <Arrow
        points={[
          stringX(-4, stringSpacing) +
            (stringX(stringNumber + 3, stringSpacing) - stringX(-4, stringSpacing)) / 2 +
            10,
          highestStringY - 80,
          stringX(stringNumber + 3, stringSpacing) + 20,
          highestStringY - 80,
        ]}
        stroke='blue'
      />

      <Arrow
        points={[
          stringX(-4, stringSpacing) +
            (stringX(stringNumber + 3, stringSpacing) - stringX(-4, stringSpacing)) / 2 -
            100,
          highestStringY - 80,
          stringX(-4, stringSpacing) - 30,
          highestStringY - 80,
        ]}
        stroke='blue'
      />

      <Label
        x={
          stringX(-4, stringSpacing) +
          (stringX(stringNumber + 3, stringSpacing) - stringX(-4, stringSpacing)) / 2
        }
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
          text={Math.round((width / 0.4) * 100) / 100 + ' mm'}
          fontSize={18}
          padding={5}
          fill='white'
        />
      </Label>
    </>
  );
};

export default Measurements;
