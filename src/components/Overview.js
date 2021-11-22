import React from 'react';
import { useSelector } from 'react-redux';

const Overview = () => {
  const { strings, stringCount } = useSelector((state) => state.string);
  let totalTension = 0;
  strings.forEach((string) => {
    totalTension += string.tension;
  });

  return (
    <>
      <h5>Overview</h5>

      <span>
        <b>{stringCount}</b> Strings
      </span>
      <br />
      <span>
        Total Tension: <b>{totalTension.toFixed(2)}</b> kg
      </span>
    </>
  );
};

export default Overview;
