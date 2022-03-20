import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { Stage, Layer, Label, Tag, Text } from 'react-konva';
import Body from './Body';
import Pillar from './Pillar';
import Neck from './Neck';
import String from './String';
import Measurements from './Measurements';
import { selectString, updateYOffset } from '../actions/stringActions';
import {
  stringX,
  stringY,
  getQBezierValue,
  calculateTensileStress,
  calculateStraightPillarCrossSectionArea,
  calculateDPillarCrossSectionArea,
  calculateYOffset,
} from '../utils';
import store from '../store';

const Harp = () => {
  const dispatch = useDispatch();

  const { strings, defaultStringLengths, stringSpacing, stringNumber, totalLoad, yOffset } =
    useSelector((state) => state.string);
  const { angle, control, stringBandThickness, length } = useSelector((state) => state.soundboard);
  const { neckJointWidth, shape, pillarDiameter, pillarWidth, pillarThickness } = useSelector(
    (state) => state.pillar
  );
  const {
    neckStyle,
    neckThickness,
    tuningPinLength,
    frontNeckThickness,
    backNeckThickness,
    frontNeckTuningPostLength,
    backNeckTuningPostLength,
  } = useSelector((state) => state.neck);

  const [width, setWidth] = useState(
    stringX(stringNumber + 3, stringSpacing) + 20 - (stringX(-4, stringSpacing) - 30)
  );
  const [height, setHeight] = useState(1214.57 * 0.48);

  const tooltip = useRef(null);

  const frontNeckLoad = useMemo(() => {
    let load = 0;
    [...strings].reverse().forEach((string, index) => {
      if (index % 2 === 0) load += string.tension;
    });

    return load;
  }, [strings]);

  const backNeckLoad = useMemo(() => {
    let load = 0;
    [...strings].reverse().forEach((string, index) => {
      if (index % 2 === 1) load += string.tension;
    });

    return load;
  }, [strings]);

  const torqueImbalance = useMemo(() => {
    const imbalance =
      (frontNeckTuningPostLength / 1000) * frontNeckLoad * 9.807 -
      (backNeckTuningPostLength / 1000) * backNeckLoad * 9.807;

    return imbalance;
  }, [frontNeckTuningPostLength, backNeckTuningPostLength, frontNeckLoad, backNeckLoad]);

  useEffect(() => {
    dispatch(updateYOffset(calculateYOffset(angle, stringSpacing)));
  }, [angle, stringSpacing, dispatch]);

  useEffect(() => {
    setWidth(stringX(stringNumber + 3, stringSpacing) + 20 - (stringX(-4, stringSpacing) - 30));
  }, [stringNumber, stringSpacing]);

  useEffect(() => {
    let yPos = 0;

    strings.forEach((string, index) => {
      const yPosAtSoundboard = getQBezierValue(
        (index + 4) / (stringNumber + 7),
        stringY(-4, yOffset, height),
        control?.y,
        stringY(stringNumber + 3, yOffset, height)
      );

      const stringHeight =
        stringY(-4, yOffset, height) - yPosAtSoundboard + string.length * 0.4 + 40;
      if (stringHeight > yPos) yPos = stringHeight;
    });

    setHeight(yPos > defaultStringLengths[0] * 0.48 ? yPos : defaultStringLengths[0] * 0.48);
  }, [defaultStringLengths, control, stringNumber, strings, yOffset]);

  return (
    <Stage width={width + 300} height={height + 300}>
      <Provider store={store}>
        <Layer
          onClick={(e) => {
            tooltip.current.position({
              x: e.evt.layerX,
              y: e.evt.layerY - 5,
            });
            if (e.target.attrs.className === 'Neck') {
              if (neckStyle === 'Standard') {
                tooltip.current
                  .getText()
                  .text(
                    `Neck\n\nNeck Style: ${neckStyle}\nTensile Stress: ${(
                      calculateTensileStress(
                        (stringX(stringNumber + 3, stringSpacing) +
                          20 -
                          (stringX(-4, stringSpacing) - 30)) /
                          0.4 /
                          1000,
                        neckThickness / 1000,
                        totalLoad * 9.807
                      ) / 1000000
                    ).toFixed(6)} MPa\nTorque: ${(
                      (tuningPinLength / 1000) *
                      totalLoad *
                      9.807
                    ).toFixed(
                      6
                    )} N m\nNeck Thickness: ${neckThickness} mm\nTuning Pin Length: ${tuningPinLength} mm`
                  );
              } else {
                tooltip.current
                  .getText()
                  .text(
                    `Neck\n\nNeck Style: ${neckStyle}\nTorque Imbalance: ${torqueImbalance.toFixed(
                      6
                    )} N m\n\nFront Neck\nTensile Stress: ${(
                      calculateTensileStress(
                        (stringX(stringNumber + 3, stringSpacing) +
                          20 -
                          (stringX(-4, stringSpacing) - 30)) /
                          0.4 /
                          1000,
                        frontNeckThickness / 1000,
                        (frontNeckLoad / 2) * 9.807
                      ) / 1000000
                    ).toFixed(
                      6
                    )} MPa\nNeck Thickness: ${frontNeckThickness} mm\nTuning Post Length: ${frontNeckTuningPostLength} mm\n\nBack Neck\nTensile Stress: ${(
                      calculateTensileStress(
                        (stringX(stringNumber + 3, stringSpacing) +
                          20 -
                          (stringX(-4, stringSpacing) - 30)) /
                          0.4 /
                          1000,
                        backNeckThickness / 1000,
                        (backNeckLoad / 2) * 9.807
                      ) / 1000000
                    ).toFixed(
                      6
                    )} MPa\nNeck Thickness: ${backNeckThickness} mm\nTuning Post Length: ${backNeckTuningPostLength} mm`
                  );
              }
            } else if (e.target.attrs.className === 'Pillar') {
              if (shape === 'Straight') {
                tooltip.current
                  .getText()
                  .text(
                    `Pillar\n\nCompresive Stress: ${(
                      (totalLoad * 0.6 * 9.807) /
                      calculateStraightPillarCrossSectionArea(pillarDiameter) /
                      1000000
                    ).toFixed(6)} MPa\nPillar Diameter: ${pillarDiameter} mm`
                  );
              } else {
                tooltip.current
                  .getText()
                  .text(
                    `Pillar\n\nCompresive Stress: ${(
                      (totalLoad * 0.6 * 9.807) /
                      calculateDPillarCrossSectionArea(pillarWidth, pillarThickness) /
                      1000000
                    ).toFixed(
                      6
                    )} MPa\nPillar Width: ${pillarWidth} mm\nPillar Thickness: ${pillarThickness} mm`
                  );
              }
            }

            tooltip.current.show();
          }}
          onMouseOver={(e) => {
            document.body.style.cursor = 'pointer';
            e.target.strokeWidth(7);
          }}
          onMouseOut={(e) => {
            document.body.style.cursor = 'default';
            e.target.strokeWidth(5);
            tooltip.current.hide();
          }}
        >
          <Pillar
            start={{ x: stringX(-4, stringSpacing), y: stringY(-4, yOffset, height) }}
            end={{
              x: stringX(-4, stringSpacing),
              y: stringY(-4, yOffset, height) - defaultStringLengths[0] * 0.48,
            }}
            dStart={{
              x: stringX(-2, stringSpacing),
              y: getQBezierValue(
                2 / (stringNumber + 7),
                stringY(-4, yOffset, height),
                control?.y,
                stringY(stringNumber + 3, yOffset, height)
              ),
            }}
            dEnd={{
              x: stringX(neckJointWidth, stringSpacing),
              y:
                getQBezierValue(
                  (4 + neckJointWidth) / (stringNumber + 7),
                  stringY(-4, yOffset, height),
                  control?.y,
                  stringY(stringNumber + 3, yOffset, height)
                ) -
                strings[neckJointWidth].length * 0.4,
            }}
          />

          <Neck
            start={{
              x: stringX(-4, stringSpacing),
              y: stringY(-4, yOffset, height) - defaultStringLengths[0] * 0.48,
            }}
            end={{
              x: stringX(stringNumber + 3, stringSpacing),
              y: stringY(stringNumber + 3, yOffset, height),
            }}
            yOffset={yOffset}
            harpHeight={height}
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
              (index + 4) / (stringNumber + 7),
              stringY(-4, yOffset, height),
              control?.y,
              stringY(stringNumber + 3, yOffset, height)
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

        <Layer
          onClick={(e) => {
            tooltip.current.position({
              x: e.evt.layerX,
              y: e.evt.layerY - 5,
            });
            tooltip.current
              .getText()
              .text(
                `Body\n\nSoundboard Angle: ${angle} degrees\nSoundboard Tensile Stress: ${(
                  calculateTensileStress(
                    length / 1000,
                    stringBandThickness / 1000,
                    totalLoad * 0.5 * 9.807
                  ) / 1000000
                ).toFixed(6)} MPa\nString Band Thickness: ${stringBandThickness} mm`
              );
            tooltip.current.show();
          }}
          onMouseOver={(e) => {
            document.body.style.cursor = 'pointer';
            e.target.strokeWidth(7);
          }}
          onMouseOut={(e) => {
            document.body.style.cursor = 'default';
            e.target.strokeWidth(5);
            tooltip.current.hide();
          }}
        >
          <Body
            start={{ x: stringX(-4, stringSpacing), y: stringY(-4, yOffset, height) }}
            end={{
              x: stringX(stringNumber + 3, stringSpacing),
              y: stringY(stringNumber + 3, yOffset, height),
            }}
            dispatch={dispatch}
          />
        </Layer>

        <Layer>
          <Measurements yOffset={yOffset} width={width} height={height} />

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
