import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-konva';
import { stringX, stringY, getQBezierValue } from '../utils';

const Neck = ({ start, end, yOffset }) => {
  const { strings, defaultStringLengths, stringSpacing, stringNumber } = useSelector(
    (state) => state.string
  );
  const { control } = useSelector((state) => state.soundboard);
  const { shape } = useSelector((state) => state.pillar);

  return (
    <>
      {control && (
        <>
          <Line
            x={0}
            y={0}
            tension={0.3}
            points={[
              start.x,
              shape === 'Straight' ? start.y : start.y + 50,
              ...topNeckPoints(
                strings,
                defaultStringLengths,
                stringY(-4, yOffset),
                control.y,
                end.y,
                stringSpacing,
                -40,
                stringNumber
              ),
              end.x,
              end.y - 30,
              end.x + 20,
              end.y,
              end.x,
              end.y + 30,
              end.x,
              end.y,
              ...bottomNeckPoints(
                strings,
                defaultStringLengths,
                stringY(-4, yOffset),
                control.y,
                end.y,
                stringSpacing,
                10,
                stringNumber
              ),
              start.x,
              start.y + 50,
            ]}
            stroke='black'
            strokeWidth={5}
            lineCap='round'
            className='Neck'
          />

          {/* {strings.map((string, index) => {
            const points = neckPoints(
              strings.map((string) => string.length),
              stringY(-4, yOffset),
              control.y,
              end.y,
              stringSpacing,
              10
            );

            if (string.length - defaultStringLengths[index] > 50) {
              return (
                <Shape
                  key={string.id}
                  stroke='black'
                  strokeWidth={3}
                  lineCap='round'
                  sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(points[index - 1][0], points[index - 1][1]);
                    context.lineTo(points[index][0], points[index][1]);
                    context.moveTo(points[index + 1][0], points[index + 1][1]);
                    context.fillStrokeShape(shape);
                  }}
                />
              );
            }

            if (string.length - defaultStringLengths[index] < -10) {
              return (
                <Shape
                  key={string.id}
                  stroke='black'
                  strokeWidth={3}
                  lineCap='round'
                  lineJoin='round'
                  sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(
                      index !== 0 ? points[index - 1][0] : points[index + 1][0] - 20,
                      index !== 0 ? points[index - 1][1] : points[index + 1][1]
                    );
                    context.lineTo(points[index][0] - 5, points[index][1]);
                    context.lineTo(points[index][0] + 5, points[index][1]);
                    context.lineTo(
                      index !== defaultStringLengths.length - 1
                        ? points[index + 1][0]
                        : points[index - 1][0] + 20,
                      index !== defaultStringLengths.length - 1
                        ? points[index + 1][1]
                        : points[index - 1][1]
                    );
                    context.fillStrokeShape(shape);
                  }}
                />
              );
            }

            return null;
          })} */}
        </>
      )}
    </>
  );
};

export default Neck;

const neckPoints = (stringLengths, start, control, end, stringSpacing, offset, stringNumber) => {
  const points = stringLengths.map((length, index) => {
    const yPos = getQBezierValue((index + 4) / (stringNumber + 7), start, control, end);
    return [stringX(index, stringSpacing), yPos - length * 0.4 + offset];
  });

  return points;
};

// const samplePoints = (stringLengths, start, control, end, stringSpacing, offset) => {
//   const points = neckPoints(stringLengths, start, control, end, stringSpacing, offset);
//   const samples = [];

//   points.forEach((point, index) => {
//     if (index % 6 === 0) {
//       samples.push(point);
//     }
//   });

//   return samples.flat();
// };

const bottomNeckPoints = (
  strings,
  stringLengths,
  start,
  control,
  end,
  stringSpacing,
  offset,
  stringNumber
) => {
  const points = neckPoints(
    strings.map((string) => string.length),
    start,
    control,
    end,
    stringSpacing,
    offset,
    stringNumber
  );
  const defaultPoints = neckPoints(
    stringLengths,
    start,
    control,
    end,
    stringSpacing,
    offset,
    stringNumber
  );
  const samples = [];

  points.forEach((point, index) => {
    const lengthDifference = strings[index].length - stringLengths[index];
    if (index % 6 === 0 && lengthDifference > -10) {
      samples.push(defaultPoints[index]);
    } else if (index % 6 === 0 || lengthDifference < -10) {
      samples.push(point);
    }
  });

  return samples.reverse().flat();
};

const topNeckPoints = (
  strings,
  stringLengths,
  start,
  control,
  end,
  stringSpacing,
  offset,
  stringNumber
) => {
  const points = neckPoints(
    strings.map((string) => string.length),
    start,
    control,
    end,
    stringSpacing,
    offset,
    stringNumber
  );
  const defaultPoints = neckPoints(
    stringLengths,
    start,
    control,
    end,
    stringSpacing,
    offset,
    stringNumber
  );
  const samples = [];

  points.forEach((point, index) => {
    const lengthDifference = strings[index].length - stringLengths[index];
    if (index % 6 === 0 && lengthDifference < 50) {
      samples.push(defaultPoints[index]);
    } else if (index % 6 === 0 || lengthDifference > 50) {
      samples.push(point);
    }
  });

  return samples.flat();
};
