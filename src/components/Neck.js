import React from 'react';
import { useSelector } from 'react-redux';
import { Shape } from 'react-konva';
import { stringX, stringY, getQBezierValue } from '../utils';

const Neck = ({ start, end, yOffset }) => {
  const { strings, stringSpacing } = useSelector((state) => state.string);
  const { control } = useSelector((state) => state.soundboard);

  return (
    <>
      <Shape
        stroke='black'
        strokeWidth={5}
        lineCap='round'
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(start.x, start.y + 30);
          neckPlot(strings, stringY(-4, yOffset), end, control, stringSpacing).forEach((point) => {
            context.lineTo(point[0], point[1]);
          });
          context.lineTo(end.x, end.y);
          context.moveTo(start.x, start.y);
          neckPlot2(strings, stringY(-4, yOffset), end, control, stringSpacing).forEach((point) => {
            context.lineTo(point[0], point[1]);
          });
          context.lineTo(end.x, end.y);
          context.fillStrokeShape(shape);
        }}
        listening={false}
      />
    </>
  );
};

export default Neck;

const neckPlot = (strings, start, end, control, stringSpacing) => {
  const points = strings.map((string, index) => {
    const yPos = getQBezierValue((index + 4) / 43, start, control?.y, end.y);
    return [stringX(index, stringSpacing), yPos - string.length * 0.4];
  });

  return points;
};

const neckPlot2 = (strings, start, end, control, stringSpacing) => {
  return strings.map((string, index) => {
    const yPos = getQBezierValue((index + 4) / 43, start, control?.y, end.y);
    return [stringX(index, stringSpacing), yPos - string.length * 0.4 - 35 + index * 0.7];
  });
};
