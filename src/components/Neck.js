import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { stringX, stringY, getQBezierValue } from '../utils';

const Neck = ({ start, end, yOffset }) => {
  const { strings, defaultStringLengths, stringSpacing } = useSelector((state) => state.string);
  const { control } = useSelector((state) => state.soundboard);
  const { shape } = useSelector((state) => state.pillar);

  return (
    <>
      {control && (
        <>
          <Line
            x={0}
            y={0}
            tension={0.35}
            points={[
              start.x,
              shape === 'Straight' ? start.y : start.y + 50,
              ...samplePoints(
                defaultStringLengths,
                stringY(-4, yOffset),
                control.y,
                end.y,
                stringSpacing,
                -40
              ),
              end.x,
              end.y - 30,
              end.x + 20,
              end.y,
              end.x,
              end.y + 30,
            ]}
            stroke='black'
            strokeWidth={5}
            lineCap='round'
            listening={false}
          />

          <Line
            x={0}
            y={0}
            tension={0.35}
            points={[
              start.x,
              start.y + 50,
              ...samplePoints(
                defaultStringLengths,
                stringY(-4, yOffset),
                control.y,
                end.y,
                stringSpacing,
                10
              ),
              end.x,
              end.y,
            ]}
            stroke='black'
            strokeWidth={5}
            lineCap='round'
            listening={false}
          />
        </>
      )}
    </>
  );
};

export default Neck;

const neckPoints = (stringLengths, start, control, end, stringSpacing, offset) => {
  const points = stringLengths.map((length, index) => {
    const yPos = getQBezierValue((index + 4) / 43, start, control, end);
    return [stringX(index, stringSpacing), yPos - length * 0.4 + offset];
  });

  return points;
};

const samplePoints = (stringLengths, start, control, end, stringSpacing, offset) => {
  const points = neckPoints(stringLengths, start, control, end, stringSpacing, offset);
  const samples = [];

  points.forEach((point, index) => {
    if (index % 6 === 0) {
      samples.push(point);
    }
  });

  return samples.flat();
};
