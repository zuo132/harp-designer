import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import OptionsPanel from './components/OptionsPanel';
import Harp from './components/Harp';
import { updateBackgroundColor } from './actions/settingsActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const { backgroundColor } = useSelector((state) => state.settings);

  return (
    <AppContainer className='App' backgroundColor={backgroundColor}>
      <Navbar className='mb-3' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Harp Designer</Navbar.Brand>
          <NavDropdown title={<DropdownTitle>Background Color</DropdownTitle>}>
            <NavItemContainer onClick={() => dispatch(updateBackgroundColor('burlywood'))}>
              <ColorIndicator color='burlywood' />
            </NavItemContainer>
            <NavItemContainer onClick={() => dispatch(updateBackgroundColor('white'))}>
              <ColorIndicator color='white' />
            </NavItemContainer>
          </NavDropdown>
        </Container>
      </Navbar>
      <Row>
        <Col md={3}>
          <OptionsPanel />
        </Col>
        <CanvasContainer md={9}>
          <Harp />
        </CanvasContainer>
      </Row>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  background-color: ${(props) => props.backgroundColor};
`;

const DropdownTitle = styled.span`
  color: white;
`;

const NavItemContainer = styled(NavDropdown.Item)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorIndicator = styled.div`
  width: 22px;
  height: 22px;
  border: 2px solid;
  border-radius: 3px;
  background-color: ${(props) => props.color};
`;

const CanvasContainer = styled(Col)`
  overflow: scroll;
`;
