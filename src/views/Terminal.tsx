import { FC, useState } from 'react';

// *** components *** //
import Input from '../components/Input';

// *** styles *** //
import '../styles/Terminal.css';

// *** types *** //
import { Line } from '../lib/types/common';

// *** utils *** //
import { Interpreter } from '../lib/interpreter';

const Terminal: FC = () => {
    const [lines, setLines] = useState<Line[]>([{ value: '' }]);
    const interpreter = Interpreter.getInstance();

    // *** methods *** //
    const updateLines = (newLines: Line[]) => setLines([...newLines, { value: '' }]);
    const clearLines = () => setLines([{ value: '' }]);

    const updateLineHistory = (value: string, shouldShowContent: boolean) => {
        if (value === 'clear') {
            clearLines();
        } else {
            let arrCopy = lines;
            // only allow for editing current line, like a command line
            arrCopy[arrCopy.length - 1].value = value;

            if (shouldShowContent) {
                const copy = interpreter.getContent(value);
                if (copy) {
                    arrCopy[arrCopy.length - 1].content = {
                        copy
                    };
                } else {
                    interpreter.goToLink(value);
                }
            } else {
                arrCopy[arrCopy.length - 1].content = {
                    copy: interpreter.getError()
                };
            }

            updateLines([...arrCopy]);
        }
    };

    // *** ui *** //
    const renderLines = (): JSX.Element => (
        <>
            {lines.map((line, idx) => (
                <>
                    <Input
                        key={`${line}${idx}`}
                        disabled={idx !== lines.length - 1}
                        initialInput={line.value}
                        onSubmit={updateLineHistory}
                    />
                    {!!line?.content?.copy && <p>{line.content.copy}</p>}
                </>
            ))}
        </>
    );

    return <div id='container'>{renderLines()}</div>;
};

export default Terminal;
