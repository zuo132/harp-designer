import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { Stage, Layer, Label, Tag, Text } from 'react-konva';
import Body from './Body';
import Pillar from './Pillar';
import Neck from './Neck';
import String from './String';
import { selectString } from '../actions/stringActions';
import { stringX, stringY, getQBezierValue } from '../utils';
import store from '../store';

const Harp = () => {
  const dispatch = useDispatch();

  const { strings, defaultStringLengths, stringSpacing } = useSelector((state) => state.string);
  const { angle, control } = useSelector((state) => state.soundboard);

  const tooltip = useRef(null);

  const [yOffset, setYOffset] = useState(calculateYOffset(angle, stringSpacing));

  useEffect(() => {
    setYOffset(calculateYOffset(angle, stringSpacing));
  }, [angle, stringSpacing]);

  return (
    <Stage width={window.innerWidth * 0.9} height={window.innerHeight * 0.9}>
      <Provider store={store}>
        <Layer>
          <Pillar
            start={{ x: stringX(-4, stringSpacing), y: stringY(-4, yOffset) }}
            end={{
              x: stringX(-4, stringSpacing),
              y: stringY(-4, yOffset) - defaultStringLengths[0] * 0.48,
            }}
            dStart={{
              x: stringX(-2, stringSpacing),
              y: getQBezierValue(2 / 43, stringY(-4, yOffset), control?.y, stringY(39, yOffset)),
            }}
            dEnd={{
              x: stringX(2, stringSpacing),
              y:
                getQBezierValue(6 / 43, stringY(-4, yOffset), control?.y, stringY(39, yOffset)) -
                strings[2].length * 0.4,
            }}
          />
          <Neck
            start={{
              x: stringX(-4, stringSpacing),
              y: stringY(-4, yOffset) - defaultStringLengths[0] * 0.48,
            }}
            end={{ x: stringX(39, stringSpacing), y: stringY(39, yOffset) }}
            yOffset={yOffset}
          />
        </Layer>
        <Layer
          onClick={(e) => {
            dispatch(selectString(e.target.attrs.string.id));
          }}
          onMouseOver={(e) => {
            const string = e.target.attrs.string;
            document.body.style.cursor = 'pointer';
            e.target.strokeWidth(5);
            tooltip.current
              .getText()
              .text(
                `Frequency: ${string.frequency} Hz, Length: ${string.length} mm, Diameter: ${Number(
                  string.diameter
                ).toFixed(2)} mm, Tension: ${string.tension.toFixed(2)} kg`
              );
            tooltip.current.position({
              x: e.evt.layerX,
              y: e.evt.layerY - 5,
            });
            tooltip.current.show();
          }}
          onMouseOut={(e) => {
            document.body.style.cursor = 'default';
            e.target.strokeWidth(3);
            tooltip.current.hide();
          }}
        >
          {strings.map((string, index) => {
            const yPos = getQBezierValue(
              (index + 4) / 43,
              stringY(-4, yOffset),
              control?.y,
              stringY(39, yOffset)
            );

            return (
              <String
                key={string.id}
                start={{
                  x: stringX(index, stringSpacing),
                  y: yPos,
                }}
                end={{
                  x: stringX(index, stringSpacing),
                  y: yPos - string.length * 0.4,
                }}
                string={string}
                stroke={
                  string.note.charAt(0) === 'C' && string.note.length === 2
                    ? 'red'
                    : string.note.charAt(0) === 'F' && string.note.length === 2
                    ? 'blue'
                    : 'white'
                }
              />
            );
          })}
        </Layer>

        <Layer>
          <Body
            start={{ x: stringX(-4, stringSpacing), y: stringY(-4, yOffset) }}
            end={{ x: stringX(39, stringSpacing), y: stringY(39, yOffset) }}
            dispatch={dispatch}
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
        </Layer>
      </Provider>
    </Stage>
  );
};

export default Harp;

// Angle in degrees
const calculateYOffset = (angle, stringSpacing) => {
  const radians = (angle * Math.PI) / 180;
  return stringSpacing * Math.tan(radians);
};
