import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  Offcanvas,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import OptionsPanel from './components/OptionsPanel';
import Harp from './components/Harp';
import {
  updateBackgroundColor,
  saveCurrentDesign,
  loadSavedDesign,
} from './actions/settingsActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const { backgroundColor } = useSelector((state) => state.settings);
  const designData = _.omit(
    useSelector((state) => state),
    'settings'
  );

  const [showSettings, setShowSettings] = useState(false);
  const [designName, setDesignName] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('');
  const [savedDesigns, setSavedDesigns] = useState([]);

  useEffect(() => {
    const designs = JSON.parse(localStorage.getItem('savedDesigns'));
    if (designs) {
      setSavedDesigns(Object.keys(designs));
      setSelectedDesign(Object.keys(designs)[0]);
    }
  }, []);

  const saveDesign = () => {
    if (designName !== '' && !savedDesigns.includes(designName)) {
      dispatch(saveCurrentDesign(designName, designData));

      const designs = JSON.parse(localStorage.getItem('savedDesigns'));
      setSavedDesigns(Object.keys(designs));
      setDesignName('');
    }
  };

  const loadDesign = () => {
    if (savedDesigns.includes(selectedDesign)) {
      dispatch(loadSavedDesign(selectedDesign));
    }
  };

  return (
    <AppContainer className='App' backgroundColor={backgroundColor}>
      <Navbar className='mb-3' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Harp Designer</Navbar.Brand>

          <NavButton variant='dark' onClick={() => setShowSettings(true)}>
            <GiHamburgerMenu />
          </NavButton>
        </Container>
      </Navbar>

      <SettingsPanel show={showSettings} onHide={() => setShowSettings(false)} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SettingContainer>
            <h5>Background Color</h5>
            <ColorIndicator
              color='burlywood'
              onClick={() => dispatch(updateBackgroundColor('burlywood'))}
            />
            <ColorIndicator
              color='white'
              onClick={() => dispatch(updateBackgroundColor('white'))}
            />
          </SettingContainer>
          <SettingContainer>
            <h5>Manage Designs</h5>

            <Form.Label>Save Current Design</Form.Label>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Please enter a name ...'
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
              />
              <Button onClick={() => saveDesign()}>Save</Button>
            </InputGroup>

            <Form.Label>Load Design</Form.Label>
            <InputGroup className='mb-3'>
              <Form.Select
                value={selectedDesign}
                onChange={(e) => setSelectedDesign(e.target.value)}
              >
                {savedDesigns.map((design) => {
                  return (
                    <option value={design} key={design}>
                      {design}
                    </option>
                  );
                })}
              </Form.Select>
              <Button onClick={() => loadDesign()}>Load</Button>
            </InputGroup>
          </SettingContainer>
        </Offcanvas.Body>
      </SettingsPanel>

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

const ColorIndicator = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 3px;
  margin: 0.5rem 1rem;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const CanvasContainer = styled(Col)`
  overflow: scroll;
`;

const NavButton = styled(Button)`
  border: none;
`;

const SettingsPanel = styled(Offcanvas)`
  background-color: #212529;
  color: white;
`;

const SettingContainer = styled.div`
  margin-bottom: 1rem;
`;
