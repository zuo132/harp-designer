import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [xScale, setXScale] = useState(13);
  const [yScale, setYScale] = useState(
    calculateHypotenuse((40 * Math.PI) / 180)
  );

  const handleEnter = (event, string) => {
    const line = event.target;
    if (line) line.attrs.strokeWidth = '6';
    line.parent.draw();
    setMessage(
      `Frequency: ${string.frequency} Hz, Length: ${string.length} mm, Tension: ${string.tension} pounds`
    );
  };

  const handleLeave = (event) => {
    const line = event.target;
    if (line) line.attrs.strokeWidth = '2';
    line.parent.draw();
    setMessage('');
  };

  const handleClick = (string) => {
    setMessage(
      `Frequency: ${string.frequency} Hz, Length: ${string.length} mm, Tension: ${string.tension} pounds`
    );
  };

  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Harp Designer</Navbar.Brand>
        </Container>
      </Navbar>
      <Stage width={window.innerWidth * 0.9} height={window.innerHeight * 0.9}>
        <Layer>
          {stringData.map((string, index) => {
            return (
              <Line
                key={string.id}
                className='string'
                x={xPosition(index)}
                y={yPosition(index, yScale)}
                points={[0, 0, 0, string.length * -0.6]}
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
            points={linePoints(yScale)}
            stroke='black'
            strokeWidth={5}
            lineCap='round'
            tension={0.5}
          />

          <Line
            x={xPosition(0)}
            y={yPosition(0, yScale)}
            points={[0, 0, 13 * 35, -yScale * 35]}
            stroke='black'
            strokeWidth={5}
            lineCap='round'
          />
        </Layer>
      </Stage>
      <h2>{message}</h2>
    </div>
  );
}

export default App;

const xPosition = (index) => {
  return index * 13 + 500;
};

const yPosition = (index, scale) => {
  return 900 - index * scale;
};

const linePoints = (scale) => {
  return stringData
    .map((string, index) => {
      return [
        index * 13,
        yPosition(index, scale) - stringData[index].length * 0.6,
      ];
    })
    .flat();
};

const calculateHypotenuse = (angle) => {
  return 13 * Math.tan(angle);
};

const stringData = [
  {
    id: '1',
    frequency: 1864.655,
    length: 80.0,
    tension: 6.661,
  },
  {
    id: '2',
    frequency: 1760.0,
    length: 100.0,
    tension: 9.272,
  },
  {
    id: '3',
    frequency: 1567.982,
    length: 123.0,
    tension: 11.134,
  },
  {
    id: '4',
    frequency: 1396.913,
    length: 145.0,
    tension: 12.281,
  },
  {
    id: '5',
    frequency: 1318.51,
    length: 165.0,
    tension: 14.168,
  },
  {
    id: '6',
    frequency: 1174.659,
    length: 175.0,
    tension: 12.649,
  },
  {
    id: '7',
    frequency: 1046.502,
    length: 190.0,
    tension: 11.835,
  },
  {
    id: '8',
    frequency: 932.328,
    length: 225.0,
    tension: 16.524,
  },
  {
    id: '9',
    frequency: 880.0,
    length: 240.0,
    tension: 16.749,
  },
  {
    id: '10',
    frequency: 783.991,
    length: 260.0,
    tension: 15.602,
  },
  {
    id: '11',
    frequency: 698.456,
    length: 275.0,
    tension: 13.853,
  },
  {
    id: '12',
    frequency: 659.255,
    length: 295.0,
    tension: 18.55,
  },
  {
    id: '13',
    frequency: 587.33,
    length: 315.0,
    tension: 16.787,
  },
  {
    id: '14',
    frequency: 523.251,
    length: 330.0,
    tension: 14.623,
  },
  {
    id: '15',
    frequency: 466.164,
    length: 348.0,
    tension: 12.907,
  },
  {
    id: '16',
    frequency: 440.0,
    length: 370.0,
    tension: 12.999,
  },
  {
    id: '17',
    frequency: 391.995,
    length: 390.0,
    tension: 14.507,
  },
  {
    id: '18',
    frequency: 349.228,
    length: 415.0,
    tension: 13.038,
  },
  {
    id: '19',
    frequency: 329.628,
    length: 445.0,
    tension: 13.355,
  },
  {
    id: '20',
    frequency: 293.665,
    length: 477.0,
    tension: 15.036,
  },
  {
    id: '21',
    frequency: 261.626,
    length: 510.0,
    tension: 23.057,
  },
  {
    id: '22',
    frequency: 233.082,
    length: 545.0,
    tension: 20.898,
  },
  {
    id: '23',
    frequency: 220.0,
    length: 585.0,
    tension: 21.451,
  },
  {
    id: '24',
    frequency: 195.998,
    length: 628.0,
    tension: 19.621,
  },
  {
    id: '25',
    frequency: 174.614,
    length: 675.0,
    tension: 17.991,
  },
  {
    id: '26',
    frequency: 164.814,
    length: 728.0,
    tension: 18.644,
  },
  {
    id: '27',
    frequency: 146.832,
    length: 785.0,
    tension: 19.955,
  },
  {
    id: '28',
    frequency: 130.813,
    length: 850.0,
    tension: 21.317,
  },
  {
    id: '29',
    frequency: 116.541,
    length: 900.0,
    tension: 22.262,
  },
  {
    id: '30',
    frequency: 110.0,
    length: 950.0,
    tension: 30.21,
  },
  {
    id: '31',
    frequency: 97.999,
    length: 1000.0,
    tension: 29.438,
  },
  {
    id: '32',
    frequency: 87.307,
    length: 1045.0,
    tension: 28.804,
  },
  {
    id: '33',
    frequency: 82.407,
    length: 1090.0,
    tension: 32.0,
  },
  {
    id: '34',
    frequency: 73.416,
    length: 1130.0,
    tension: 30.378,
  },
  {
    id: '35',
    frequency: 65.406,
    length: 1168.0,
    tension: 27.952,
  },
  {
    id: '36',
    frequency: 58.27,
    length: 1205.0,
    tension: 23.613,
  },
].reverse();
