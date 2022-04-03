import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { updateStringMaterialDensity } from '../actions/stringActions';

const StringMaterialOptions = () => {
  const dispatch = useDispatch();

  const { materialDensity } = useSelector((state) => state.string);

  const [density, setDensity] = useState(materialDensity);

  useEffect(() => {
    setDensity(materialDensity);
  }, [materialDensity]);

  const updateMaterial = (density) => {
    dispatch(updateStringMaterialDensity(density));
  };

  return (
    <>
      <h5>
        <OverlayTrigger
          placement='right'
          overlay={<Tooltip>This setting applies to all strings</Tooltip>}
        >
          <span>String Material (global)</span>
        </OverlayTrigger>
      </h5>

      <StyledButton
        variant={density === 1.14 ? 'primary' : materialDensity === 1.14 ? 'dark' : 'secondary'}
        onClick={() => setDensity(1.14)}
      >
        Nylon
      </StyledButton>

      <StyledButton
        variant={density === 8.77 ? 'primary' : materialDensity === 8.77 ? 'dark' : 'secondary'}
        onClick={() => setDensity(8.77)}
      >
        Brass
      </StyledButton>

      <StyledButton
        variant={density === 7.8 ? 'primary' : materialDensity === 7.8 ? 'dark' : 'secondary'}
        onClick={() => setDensity(7.8)}
      >
        Steel
      </StyledButton>

      <StyledButton
        variant={density === 8.94 ? 'primary' : materialDensity === 8.94 ? 'dark' : 'secondary'}
        onClick={() => setDensity(8.94)}
      >
        Copper
      </StyledButton>

      <StyledButton
        variant={density === 8.85 ? 'primary' : materialDensity === 8.85 ? 'dark' : 'secondary'}
        onClick={() => setDensity(8.85)}
      >
        Phosphor Bronze
      </StyledButton>

      <ApplyButton
        className='btn-sm mt-2'
        variant='secondary'
        onClick={() => updateMaterial(density)}
        disabled={materialDensity === density}
      >
        Apply
      </ApplyButton>
    </>
  );
};

export default StringMaterialOptions;

const StyledButton = styled(Button)`
  margin-right: 1rem;
  margin-bottom: 0.5rem;
`;

const ApplyButton = styled(Button)`
  display: block;
`;
