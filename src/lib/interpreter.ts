import commands from './commands';

class Interpreter {
  isValidCommand(input: string) {
    return commands.some((cmd) => cmd === input);
  }

  about() {}
  email() {}
  phone() {}
  github() {}
  resume() {}
  experience() {}
  skills() {}
  education() {}
  contact() {}

  _goToLink() {}
}

// creates Singleton instance
const instance = new Interpreter();
Object.freeze(instance);

export default instance;
