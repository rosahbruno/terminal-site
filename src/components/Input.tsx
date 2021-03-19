import { FC, useEffect, useRef, useState } from 'react';

// *** styles *** //
import '../styles/Input.css';

// *** utils *** //
import { Interpreter } from '../lib/Interpreter';
import strings from '../lib/strings';

interface InputProps {
  disabled: boolean;
  initialInput: string;
  onSubmit: (value: string, shouldShowContent: boolean) => void;
}

const Input: FC<InputProps> = ({ disabled, initialInput, onSubmit }) => {
  const interpreter = Interpreter.getInstance();
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState<string>(initialInput ?? '');
  const updateInput = (userInput: any) => setInput(userInput.target.value);

  // need this so when user enters 'clear' it resets active input
  useEffect(() => {
    if (initialInput === '') {
      setInput('');

      // need to refocus on input whenever clear happens
      if (!!inputRef?.current) {
        inputRef.current.focus();
      }
    }
  }, [initialInput]);

  // *** methods *** //
  const handleKeyDown = (event: any, shouldShowContent: boolean) => {
    if (event.key === 'Enter') {
      onSubmit(input, shouldShowContent);
      if (input === 'clear') {
        setInput('');
      }
    }
  };

  // *** ui *** //
  const renderStart = () => <p id='start'>{strings.inputStart}</p>;
  const renderInput = () => {
    const shouldShowContent = interpreter.isValidCommand(input);
    const classes = `input ${shouldShowContent ? 'found' : 'not-found'}`;
    return (
      <input
        ref={inputRef}
        type='text'
        name='input'
        value={input}
        className={classes}
        onChange={updateInput}
        onKeyDown={(ev) => handleKeyDown(ev, shouldShowContent)}
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
