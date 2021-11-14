import React from 'react';
import { Line } from 'react-konva';

const Pillar = ({ start, end, width = 50 }) => {
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
