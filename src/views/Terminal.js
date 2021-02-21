import React, { useState } from 'react';

// *** components *** //
import Input from '../components/Input';

// *** styles *** //
import '../styles/Terminal.css';

function Terminal() {
  // *** state *** //
  const [lines, setLines] = useState(['']);

  // *** lifecycle *** //

  // *** methods *** //
  const incrementLines = () => setLines([
    ...lines,
    ''
  ]);

  // *** ui *** //
  const renderLines = () => lines.map((line) => <Input input={line} />);

  return (
    <div id='container'>
      {renderLines()}
    </div>
  );
}

export default Terminal;
