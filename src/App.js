import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Line, Label, Tag, Text, Shape } from 'react-konva';
import Konva from 'konva';
import { Navbar, Container, Modal, Button, Form } from 'react-bootstrap';
import { stringData } from './data';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const StringSpacing = 10;

function App() {
  const layer = useRef(null);
  const tooltip = useRef(null);

  const [soundboardAngle, setSoundboardAngle] = useState(50);
  const [yOffset, setYOffset] = useState(calculateYOffset(soundboardAngle));
  const [stringId, setStringId] = useState(null);
  const [stringLength, setStringLength] = useState(0);
  const [tension, setTension] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSoundboardAngleModal, setShowSoundboardAngleModal] = useState(false);
  const [soundboard, setSoundboard] = useState(null);

  useEffect(() => {
    if (layer.current) {
      if (soundboard) Object.values(soundboard).forEach((anchor) => anchor.destroy());

      setSoundboard({
        start: buildAnchor(xPosition(-4), yPosition(-4, yOffset), layer.current, false),
        control: buildAnchor(xPosition(18), yPosition(18, yOffset), layer.current),
        end: buildAnchor(xPosition(39), yPosition(39, yOffset), layer.current, false),
      });
    }
  }, [layer, yOffset]);

  const handleClick = (string) => {
    setStringId(string.id);
    setStringLength(string.length);
    setTension(string.tension);
    setShowModal(true);
  };

  const updateString = () => {
    const string = stringData.find((string) => string.id === stringId);
    string.length = stringLength;
    string.tension = tension;
    setShowModal(false);
  };

  const updateSoundboardAngle = () => {
    setYOffset(calculateYOffset(soundboardAngle));
    setShowSoundboardAngleModal(false);
  };

  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Harp Designer</Navbar.Brand>
        </Container>
      </Navbar>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>String Length (mm)</Form.Label>
              <Form.Control
                type='number'
                value={stringLength}
                onChange={(e) => setStringLength(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tension (lb)</Form.Label>
              <Form.Control
                type='number'
                value={tension}
                onChange={(e) => setTension(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={updateString}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSoundboardAngleModal} onHide={() => setShowSoundboardAngleModal(false)}>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>
                Angle (<span>&#176;</span>)
              </Form.Label>
              <Form.Control
                type='number'
                value={soundboardAngle}
                onChange={(e) => setSoundboardAngle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowSoundboardAngleModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={updateSoundboardAngle}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Stage width={window.innerWidth * 0.9} height={window.innerHeight * 0.9}>
        <Layer ref={layer}>
          {soundboard && (
            <>
              {stringData.map((string, index) => {
                return (
                  <Shape
                    key={string.id}
                    stroke='blue'
                    strokeWidth={3}
                    lineCap='round'
                    sceneFunc={(context, shape) => {
                      const yPos = getQBezierValue(
                        (index + 4) / 43,
                        soundboard.start.y(),
                        soundboard.control.y(),
                        soundboard.end.y()
                      );
                      context.beginPath();
                      context.moveTo(xPosition(index), yPos);
                      context.lineTo(xPosition(index), yPos - string.length * 0.4);
                      context.fillStrokeShape(shape);

                      shape.on('mouseover', function (event) {
                        document.body.style.cursor = 'pointer';
                        this.strokeWidth(5);
                        tooltip.current
                          .getText()
                          .text(
                            `Frequency: ${string.frequency} Hz, Length: ${string.length} mm, Tension: ${string.tension} pounds`
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
                        handleClick(string);
                      });
                    }}
                  />
                );
              })}

              <Shape
                stroke='black'
                strokeWidth={5}
                lineJoin='round'
                sceneFunc={(context, shape) => {
                  context.beginPath();
                  context.moveTo(soundboard.start.x(), soundboard.start.y());
                  context.quadraticCurveTo(
                    soundboard.control.x(),
                    soundboard.control.y(),
                    soundboard.end.x(),
                    soundboard.end.y()
                  );
                  context.lineTo(soundboard.end.x(), soundboard.end.y() + 30);
                  context.lineTo(soundboard.start.x() + 100, soundboard.start.y());
                  context.closePath();
                  context.fillStrokeShape(shape);

                  shape.on('mouseover', function () {
                    document.body.style.cursor = 'pointer';
                    this.strokeWidth(7);
                  });

                  shape.on('mouseout', function () {
                    document.body.style.cursor = 'default';
                    this.strokeWidth(5);
                  });

                  shape.on('click', function () {
                    setShowSoundboardAngleModal(true);
                  });
                }}
              />

              <Shape
                stroke='black'
                strokeWidth={5}
                lineCap='round'
                sceneFunc={(context, shape) => {
                  context.beginPath();
                  context.moveTo(
                    soundboard.start.x(),
                    yPosition(0, yOffset) - stringData[0].length * 0.4
                  );
                  linePoints(soundboard).forEach((point) => {
                    context.lineTo(point[0], point[1]);
                  });
                  context.lineTo(soundboard.end.x(), soundboard.end.y());
                  context.fillStrokeShape(shape);
                }}
              />

              <Shape
                stroke='black'
                strokeWidth={5}
                lineCap='round'
                sceneFunc={(context, shape) => {
                  context.beginPath();
                  context.moveTo(
                    soundboard.start.x(),
                    yPosition(0, yOffset) - stringData[0].length * 0.43
                  );
                  neckPoints(soundboard).forEach((point) => {
                    context.lineTo(point[0], point[1]);
                  });
                  context.lineTo(soundboard.end.x(), soundboard.end.y());
                  context.fillStrokeShape(shape);
                }}
              />
            </>
          )}

          <Line
            x={xPosition(0)}
            y={yPosition(0, yOffset)}
            points={[
              StringSpacing * -4,
              yOffset * 4,
              StringSpacing * -7,
              yOffset * 4,
              StringSpacing * -7,
              stringData[0].length * -0.43,
              StringSpacing * -4,
              stringData[0].length * -0.43,
            ]}
            stroke='black'
            strokeWidth={5}
            closed
            lineJoin='round'
            lineCap='round'
          />
        </Layer>
        <Layer>
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
      </Stage>
    </div>
  );
}

export default App;

const inchToMeter = (value) => {
  return (value * 2.54) / 100;
};

const mmToMeter = (value) => {
  return value * 1000;
};

const calculateTension = (string) => {
  const p = 1150;
  const mu = (inchToMeter(string.diameter) / 2) ** 2 * Math.PI * p;
  return (string.frequency / (1 / (2 * mmToMeter(string.length)))) ** 2 * mu * 2.2046;
};

const xPosition = (index) => {
  return index * StringSpacing + 500;
};

const yPosition = (index, scale) => {
  return 600 - index * scale;
};

const linePoints = (soundboard) => {
  return stringData.map((string, index) => {
    const yPos = getQBezierValue(
      (index + 4) / 43,
      soundboard.start.y(),
      soundboard.control.y(),
      soundboard.end.y()
    );
    return [xPosition(index), yPos - stringData[index].length * 0.4];
  });
};

const neckPoints = (soundboard) => {
  return stringData.map((string, index) => {
    const yPos = getQBezierValue(
      (index + 4) / 43,
      soundboard.start.y(),
      soundboard.control.y(),
      soundboard.end.y()
    );
    return [xPosition(index), yPos - stringData[index].length * 0.4 - 35 + index * 0.7];
  });
};

// Angle in degrees
const calculateYOffset = (angle) => {
  const radians = (angle * Math.PI) / 180;
  return StringSpacing * Math.tan(radians);
};

const buildAnchor = (x, y, layer, draggable = true) => {
  const anchor = new Konva.Circle({
    x: x,
    y: y,
    radius: 20,
    stroke: '#666',
    fill: draggable ? '#ddd' : 'gray',
    strokeWidth: 2,
    draggable,
  });

  if (draggable) layer.add(anchor);

  anchor.on('mouseenter', function () {
    document.body.style.cursor = 'pointer';
    this.strokeWidth(4);
  });
  anchor.on('mouseleave', function () {
    document.body.style.cursor = 'default';
    this.strokeWidth(2);
  });
  anchor.on('dragmove', function () {
    this.x(xPosition(18));
  });

  return anchor;
};

function getQBezierValue(t, p1, p2, p3) {
  var iT = 1 - t;
  return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}
