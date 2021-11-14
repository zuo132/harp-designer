import React, { useRef } from 'react';
import { Shape, Circle } from 'react-konva';

const Body = ({ start, end }) => {
  const control = useRef(null);

  return (
    <>
      <Shape
        stroke='black'
        strokeWidth={5}
        lineJoin='round'
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(start.x, start.y);
          context.quadraticCurveTo(control.current?.x(), control.current?.y(), end.x, end.y);
          context.lineTo(end.x, end.y + 30);
          context.lineTo(start.x + 100, start.y);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
      />

      <Circle
        ref={control}
        x={(start.x + end.x) / 2}
        y={(start.y + end.y) / 2}
        radius={20}
        stroke='#666'
        fill='#ddd'
        strokeWidth={2}
        draggable
        onMouseEnter={function () {
          document.body.style.cursor = 'pointer';
          this.strokeWidth(4);
        }}
        onMouseLeave={function () {
          document.body.style.cursor = 'default';
          this.strokeWidth(2);
        }}
        onDragMove={function () {
          this.x((start.x + end.x) / 2);
        }}
      />
    </>
  );
};

export default Body;
