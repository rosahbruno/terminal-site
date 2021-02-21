import commands from './commands';
import content from './content';
import links from './links';

import { Link } from './types/common';

class Interpreter {
  isValidCommand(input: string) {
    return commands.some((cmd) => cmd === input);
  }

  getContent(type: string): string {
    return content?.[type as keyof typeof content] || '';
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

  // TODO - figure out how to kickoff a resume download
  resume() {}

  // TODO - implement autocomplete (https://medium.com/weekly-webtips/js-implementing-auto-complete-f4c5a5d5c009)
  autocomplete() {}

  _goToLink(link: Link) {
    console.log(link);
  }
}

// creates Singleton instance
const instance = new Interpreter();
Object.freeze(instance);

export default instance;
