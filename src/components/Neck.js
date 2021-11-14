import React from 'react';
import { Shape } from 'react-konva';

const strings = [];

const Neck = ({ start, end, control }) => {
  return (
    <>
      <Shape
        stroke='black'
        strokeWidth={5}
        lineCap='round'
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(start.x, start.y);
          linePoints(start, end, control).forEach((point) => {
            context.lineTo(point[0], point[1]);
          });
          context.lineTo(end.x, end.y);
          context.fillStrokeShape(shape);
        }}
      />
    </>
  );
};

export default Neck;

const linePoints = (start, end, control) => {
  return strings.map((string, index) => {
    const yPos = getQBezierValue((index + 4) / 43, start.y, control.y, end.y);
    return [xPosition(index), yPos - strings[index].length * 0.4];
  });
};

function getQBezierValue(t, p1, p2, p3) {
  var iT = 1 - t;
  return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}

const xPosition = () => 123;
