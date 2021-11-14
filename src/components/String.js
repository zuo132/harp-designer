import React, { useRef } from 'react';
import { Shape, Label, Tag, Text } from 'react-konva';

const String = ({ start, end, string, stroke = 'white' }) => {
  const tooltip = useRef(null);

  return (
    <>
      <Shape
        stroke={stroke}
        strokeWidth={3}
        lineCap='round'
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(start.x, start.y);
          context.lineTo(end.x, end.y);
          context.fillStrokeShape(shape);

          shape.on('mouseover', function (event) {
            document.body.style.cursor = 'pointer';
            this.strokeWidth(5);
            tooltip.current
              .getText()
              .text(
                `Frequency: ${string.frequency} Hz, Length: ${string.length} mm, Diameter: ${Number(
                  string.diameter
                ).toFixed(2)} mm, Tension: ${string.tension.toFixed(2)} kg`
              );
            tooltip.current.position({
              x: event.evt.layerX,
              y: event.evt.layerY - 5,
            });
            tooltip.current.show();
          });

          shape.on('mouseout', function () {
            document.body.style.cursor = 'default';
            this.strokeWidth(3);
            tooltip.current.hide();
          });

          shape.on('click', function () {
            console.log('clicked!');
          });
        }}
      />

      <Label opacity={0.8} visible={false} listening={false} ref={tooltip}>
        <Tag
          fill='black'
          pointerDirection='down'
          pointerWidth={10}
          pointerHeight={10}
          lineJoin='round'
        />
        <Text text='' fontSize={18} padding={5} fill='white' />
      </Label>
    </>
  );
};

export default String;
