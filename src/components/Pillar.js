import React from 'react';
import { useSelector } from 'react-redux';
import { Line, Shape } from 'react-konva';

const Pillar = ({ start, end, dStart, dEnd, width = 30 }) => {
  const { shape } = useSelector((state) => state.pillar);

  if (shape === 'D Shape') {
    return (
      <Shape
        stroke='black'
        strokeWidth={5}
        lineCap='round'
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(start.x, start.y);
          context.quadraticCurveTo(
            (start.x + end.x) / 2 - 100,
            (start.y + end.y) / 2,
            end.x,
            end.y + 50
          );
          context.moveTo(dStart.x, dStart.y);
          context.quadraticCurveTo(
            (dStart.x + dEnd.x) / 2 - 100,
            (dStart.y + dEnd.y) / 2,
            dEnd.x,
            dEnd.y + 15
          );
          context.fillStrokeShape(shape);
        }}
        listening={false}
      />
    );
  }

  return (
    <Line
      x={0}
      y={0}
      points={[start.x, start.y, end.x, end.y, end.x - width, end.y, start.x - width, start.y]}
      stroke='black'
      strokeWidth={5}
      closed
      lineJoin='round'
      lineCap='round'
      listening={false}
    />
  );
};

export default Pillar;
