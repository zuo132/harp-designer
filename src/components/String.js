import React from 'react';
import { Shape, Circle } from 'react-konva';

const String = ({ start, end, string, stroke = 'white' }) => {
  return (
    <>
      <Shape
        stroke={stroke}
        strokeWidth={3}
        lineCap='round'
        string={string}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(start.x, start.y);
          context.lineTo(end.x, end.y - 20);
          context.fillStrokeShape(shape);
        }}
      />
      <Circle x={end.x} y={end.y || 0} stroke='gray' radius={2} listening={false} />
      <Circle x={end.x} y={end.y - 20 || 0} stroke='gray' radius={3} listening={false} />
    </>
  );
};

export default String;
