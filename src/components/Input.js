import React, { useState } from 'react';

// *** styles *** //
import '../styles/Input.css';

// *** utils *** //
import strings from '../lib/strings';

export default function Input({ disabled, initialInput, onSubmit }) {
  // *** state *** //
  const [input, setInput] = useState(initialInput || '');
  const updateInput = (userInput) => setInput(userInput.target.value);

  // *** methods *** //
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(input);
    }
  }

  // *** ui *** //
  const renderStart = () => <p id='start'>{strings.inputStart}</p>;
  const renderInput = () => (
    <input
      type='text'
      name='input'
      value={input}
      className='input'
      onChange={updateInput}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      autoFocus={true}
    />
  );

  return (
    <div id='inputContainer'>
      {renderStart()}
      {renderInput()}
    </div>
  );
}
