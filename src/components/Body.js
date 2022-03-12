import React, { useRef, useState, useEffect } from 'react';
import { Shape, Circle } from 'react-konva';
import { updateControlPosition, updateSoundboardLength } from '../actions/soundboardActions';

const Body = ({ start, end, dispatch }) => {
  const control = useRef(null);
  const [cachedEnd, setCachedEnd] = useState(end);

  useEffect(() => {
    dispatch(updateControlPosition({ x: control.current.x(), y: control.current.y() }));
  }, [control, dispatch]);

  useEffect(() => {
    const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) * 0.4;
    dispatch(updateSoundboardLength(length));
  }, []);

  useEffect(() => {
    if (end.y !== cachedEnd.y) {
      const length = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) * 0.4;
      dispatch(updateSoundboardLength(length));

      dispatch(
        updateControlPosition({
          x: control.current.x(),
          y: control.current.y(),
        })
      );

      setCachedEnd(end);
    }
  }, [control, dispatch, end]);

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
        onDragEnd={function () {
          dispatch(
            updateControlPosition({
              x: this.x(),
              y: this.y(),
            })
          );
        }}
      />
    </>
  );
};

export default Body;
