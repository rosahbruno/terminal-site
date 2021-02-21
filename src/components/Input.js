import React from 'react';

// *** styles *** //
import '../styles/Input.css';

// *** utils *** //
import strings from '../lib/strings';

export default function Input({ input }) {
  const renderStart = () => <p id='start'>{strings.inputStart}</p>;
  const renderInput = () => <input type='text' name='input' value={input} id='input' />;

  return (
    <div id='inputContainer'>
      {renderStart()}
      {renderInput()}
    </div>
  );
}
