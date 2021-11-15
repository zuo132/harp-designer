import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import OptionsPanel from './components/OptionsPanel';
import Harp from './components/Harp';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navbar className='mb-3' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Harp Designer</Navbar.Brand>
        </Container>
      </Navbar>
      <Row>
        <Col md={3}>
          <OptionsPanel />
        </Col>
        <Col md={9}>
          <Harp />
        </Col>
      </Row>
    </div>
  );
}

export default App;
