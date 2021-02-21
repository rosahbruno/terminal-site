import React, { useState } from 'react';

// *** components *** //
import Input from '../components/Input';

// *** styles *** //
import '../styles/Terminal.css';

function Terminal() {
  // *** state *** //
  const [lines, setLines] = useState(['']);

  // *** methods *** //
  const incrementLines = () => setLines([...lines, '']);

  const updateLineHistory = (value) => {
    let arrCopy = lines;
    arrCopy[arrCopy.length - 1] = value;
    setLines([...arrCopy]);
    incrementLines();
  };

  // *** ui *** //
  const renderLines = () =>
    lines.map((line, idx) => (
      <Input
        key={`${line}${idx}`}
        disabled={idx !== lines.length - 1}
        initialInput={line}
        onSubmit={updateLineHistory}
      />
    ));

  return <div id='container'>{renderLines()}</div>;
}

export default Terminal;
