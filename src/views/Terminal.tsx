import React, { FC, useState } from 'react';

// *** components *** //
import Input from '../components/Input';

// *** styles *** //
import '../styles/Terminal.css';

const Terminal: FC = () => {
  const [lines, setLines] = useState<string[]>(['']);

  // *** methods *** //
  const updateLines = (newLines: string[]) => setLines([...newLines, '']);

  const updateLineHistory = (value: string) => {
    let arrCopy = lines;
    // only allow for editing last line, like a command lineÎ
    arrCopy[arrCopy.length - 1] = value;
    updateLines([...arrCopy]);
  };

  // *** ui *** //
  const renderLines = (): JSX.Element => (
    <>
      {lines.map((line, idx) => (
        <Input
          key={`${line}${idx}`}
          disabled={idx !== lines.length - 1}
          initialInput={line}
          onSubmit={updateLineHistory}
        />
      ))}
    </>
  );

  return <div id='container'>{renderLines()}</div>;
};

export default Terminal;
