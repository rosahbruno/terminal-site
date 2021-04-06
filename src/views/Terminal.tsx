import { FC, useState } from 'react';

// *** context *** //
import { ThemeContext, ThemeOptions, themes } from '../context/themeContext';

// *** components *** //
import Input from '../components/Input';

// *** styles *** //
import '../styles/Terminal.css';

// *** types *** //
import { Line } from '../lib/types/common';

// *** utils *** //
import { Interpreter } from '../lib/interpreter';

const Terminal: FC = () => {
    const [theme, setTheme] = useState<ThemeOptions>(themes.DARK);
    const [lines, setLines] = useState<Line[]>([{ value: '' }]);
    const interpreter = Interpreter.getInstance();

    const toggleTheme = () => {
        setTheme(theme === themes.DARK ? themes.LIGHT : themes.DARK);
    };

    // *** methods *** //
    const updateLines = (newLines: Line[]) => setLines([...newLines, { value: '' }]);
    const clearLines = () => setLines([{ value: '' }]);

    const updateLineHistory = (value: string, isValidCommand: boolean) => {
        if (value === 'clear') {
            clearLines();
        } else {
            let arrCopy = lines;
            // only allow for editing current line, like a command line
            arrCopy[arrCopy.length - 1].value = value;

            if (isValidCommand) {
                if (value === 'theme') {
                    toggleTheme();
                } else {
                    const copy = interpreter.getContent(value);
                    if (copy) {
                        arrCopy[arrCopy.length - 1].content = {
                            copy
                        };
                    } else {
                        interpreter.goToLink(value);
                    }
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

    return (
        <ThemeContext.Provider value={theme}>
            <div
                id='container'
                style={{
                    backgroundColor: theme.background,
                    color: theme.foreground
                }}
            >
                {renderLines()}
            </div>
        </ThemeContext.Provider>
    );
};

export default Terminal;
