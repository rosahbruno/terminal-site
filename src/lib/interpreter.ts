import commands from './commands';
import content from './content';
import links from './links';

import { Link } from './types/common';

export class Interpreter {
    private static instance: Interpreter;
    private constructor() {}

    public static getInstance(): Interpreter {
        if (!Interpreter.instance) {
            Interpreter.instance = new Interpreter();
        }

        return Interpreter.instance;
    }

    isValidCommand(input: string): boolean {
        return commands.some((cmd) => cmd === input);
    }

    getContent(type: string): string {
        return content?.[type as keyof typeof content] ?? '';
    }

    getError(): string {
        return content.commandNotFoundError;
    }

    getLink(type: string): void {
        let link: Link | null = null;

        switch (type) {
            case 'codewars':
                link = {
                    title: 'CodeWars',
                    url: links.codewars
                };
                break;
            case 'github':
                link = {
                    title: 'GitHub',
                    url: links.github
                };
                break;
            case 'linkedin':
                link = {
                    title: 'LinkedIn',
                    url: links.linkedin
                };
                break;
            case 'twitter':
                link = {
                    title: 'Twitter',
                    url: links.twitter
                };
                break;
            default:
                return;
        }

        this._goToLink(link);
    }

    // @todo - figure out how to kickoff a resume download
    resume() {}

    // @todo - implement autocomplete (https://medium.com/weekly-webtips/js-implementing-auto-complete-f4c5a5d5c009)
    autocomplete() {}

    _goToLink(link: Link) {
        console.log(link);
    }
}
