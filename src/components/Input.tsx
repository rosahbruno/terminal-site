import React from 'react';

// *** styles *** //
import '../styles/Input.css';

// *** utils *** //
import Interpreter from '../lib/interpreter';
import strings from '../lib/strings';

interface InputProps {
  disabled: boolean;
  initialInput: string;
  onSubmit: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ disabled, initialInput, onSubmit }) => {
  const [input, setInput] = React.useState(initialInput || '');
  const updateInput = (userInput: any) => setInput(userInput.target.value);

  // *** methods *** //
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      onSubmit(input);
    }
  };

  // *** ui *** //
  const renderStart = () => <p id='start'>{strings.inputStart}</p>;
  const renderInput = () => {
    const classes = `input ${Interpreter.isValidCommand(input) ? 'found' : 'not-found'}`;
    return (
      <input
        type='text'
        name='input'
        value={input}
        className={classes}
        onChange={updateInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus={true}
      />
    );
  };

  return (
    <div id='inputContainer'>
      {renderStart()}
      {renderInput()}
    </div>
  );
};

export default Input;
