import { get, set } from 'lodash';

const ID = 'util';

const lexicon = {};

const matchRules = [
  'help',
  'sudo *',
  'OOPPEENN',
];

const reply = (input, context) => {
  const timesMatched = get(context, 'intro.matched', 0);
  set(context, 'intro.matched', timesMatched + 1);

  if (input === 'O P E N') {
    if (get(context, 'intro.name')) {
      return {
        mode: 'text',
        value: `Hello ${context.intro.name.split(' ')[0]}. Nice to see you again.`
      };
    }

    return {
      mode: 'text',
      value: `Hello there. I don't believe we've been introduced. What's your name?`
    };
    
  }

  if (input.toLowerCase().includes('sudo')) {
    return {
      mode: 'text',
      value: `root@beerjsbot: This is not a *nix, y'know.`
    };
  }

  return {
    mode: 'text',
    value: 'Stuff I can do for you: tell you the time, ask for names, look up facts and hopefully more soon ;)'
  };
}

export default {
  ID,
  lexicon,
  matchRules,
  reply,
};