import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Label, Tag, Text } from "react-konva";
import { Navbar, Container, Modal, Button, Form } from "react-bootstrap";
import { stringData } from "./data";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const StringSpacing = 10;

function App() {
  const [soundBoardAngle, setSoundBoardAngle] = useState(40);
  const [yOffset, setYOffset] = useState(calculateYOffset(soundBoardAngle));
  const [stringId, setStringId] = useState(null);
  const [stringLength, setStringLength] = useState(0);
  const [tension, setTension] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSoundBoardAngleModal, setShowSoundBoardAngleModal] = useState(false);

  const tooltip = useRef(null);

  const handleEnter = (event, string) => {
    const line = event.target;
    if (line) line.attrs.strokeWidth = "6";
    line.parent.draw();
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
  };

  const handleLeave = (event) => {
    const line = event.target;
    if (line) line.attrs.strokeWidth = "2";
    line.parent.draw();
    tooltip.current.hide();
  };

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

  const updateSoundBoardAngle = () => {
    setYOffset(calculateYOffset(soundBoardAngle));
    setShowSoundBoardAngleModal(false);
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
      <Modal show={showSoundBoardAngleModal} onHide={() => setShowSoundBoardAngleModal(false)}>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>
                Angle (<span>&#176;</span>)
              </Form.Label>
              <Form.Control
                type='number'
                value={soundBoardAngle}
                onChange={(e) => setSoundBoardAngle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowSoundBoardAngleModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={updateSoundBoardAngle}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Stage width={window.innerWidth * 0.9} height={window.innerHeight * 0.9}>
        <Layer>
          {stringData.map((string, index) => {
            return (
              <Line
                key={string.id}
                className='string'
                x={xPosition(index)}
                y={yPosition(index, yOffset)}
                points={[0, 0, 0, string.length * -0.4]}
                stroke='blue'
                onMouseEnter={(e) => handleEnter(e, string)}
                onMouseLeave={(e) => handleLeave(e)}
                onClick={() => handleClick(string)}
              />
            );
          })}

          <Line
            x={xPosition(0)}
            y={0}
            points={linePoints(yOffset)}
            stroke='black'
            strokeWidth={5}
            lineCap='round'
            tension={0.5}
          />

          <Line
            x={xPosition(0)}
            y={0}
            points={neckPoints(yOffset)}
            stroke='black'
            strokeWidth={5}
            lineCap='round'
            tension={0.5}
          />

          <Line
            x={xPosition(0)}
            y={yPosition(0, yOffset)}
            points={[
              StringSpacing * -2,
              yOffset * 2,
              0,
              0,
              StringSpacing * 37,
              -yOffset * 37,
              StringSpacing * 38,
              -yOffset * 37,
              StringSpacing * 2,
              yOffset * 2,
            ]}
            stroke='black'
            strokeWidth={5}
            closed
            lineJoin='round'
            lineCap='round'
            onClick={() => setShowSoundBoardAngleModal(true)}
            onMouseEnter={(event) => {
              const line = event.target;
              if (line) line.attrs.strokeWidth = "10";
              line.parent.draw();
              tooltip.current.getText().text(soundBoardAngle + "\xB0");
              tooltip.current.position({
                x: event.evt.layerX,
                y: event.evt.layerY - 5,
              });
              tooltip.current.show();
            }}
            onMouseLeave={(event) => {
              const line = event.target;
              if (line) line.attrs.strokeWidth = "5";
              line.parent.draw();
              tooltip.current.hide();
            }}
          />
          <Line
            x={xPosition(0)}
            y={yPosition(0, yOffset)}
            points={[
              StringSpacing * -2,
              yOffset * 2,
              StringSpacing * -5,
              yOffset * 2,
              StringSpacing * -5,
              stringData[0].length * -0.43,
              StringSpacing * -2,
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

const linePoints = (scale) => {
  return stringData
    .map((string, index) => {
      return [index * StringSpacing, yPosition(index, scale) - stringData[index].length * 0.4];
    })
    .flat();
};

const neckPoints = (scale) => {
  return stringData
    .map((string, index) => {
      return [
        index * StringSpacing,
        yPosition(index, scale) - stringData[index].length * 0.4 - 35 + index * 0.7,
      ];
    })
    .flat();
};

// Angle in degrees
const calculateYOffset = (angle) => {
  const radians = (angle * Math.PI) / 180;
  return StringSpacing * Math.tan(radians);
};
