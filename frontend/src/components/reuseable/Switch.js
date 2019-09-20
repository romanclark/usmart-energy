import React from 'react';

const Switch = ({ id, isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={id}
        type="checkbox"
      />
      <label
        className={isOn ? "switch-on react-switch-label" : "switch-off react-switch-label"}
        htmlFor={id}>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;