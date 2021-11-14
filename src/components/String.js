import React from 'react';
import { Shape } from 'react-konva';

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
          context.lineTo(end.x, end.y);
          context.fillStrokeShape(shape);
        }}
      />
    </>
  );
};

export default String;
