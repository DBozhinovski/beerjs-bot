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

  localStorage.setItem('bjs-bot-context', JSON.stringify(context));

  if (input === 'OOPPEENN') {
    if (get(context, 'intro.name')) {
      return {
        mode: 'text',
        value: `Hello ${context.intro.name.split(' ')[0]}. Nice to see you again. (type "help" for some instructions)`
      };
    }

    return {
      mode: 'text',
      value: `Hello there. I don't believe we've been introduced. What's your name? (type "help" for some instructions)`
    };
    
  }

  if (input.toLowerCase().includes('sudo')) {
    return {
      mode: 'text',
      value: `root@beerjsbot: This is not a *nix, y'know. And I can't really "${input}" unless you ask nicely.`
    };
  }

  return {
    mode: 'text',
    value: `'Stuff I can do for you: tell you the time, do introdcutions, tell you my name, look up facts (when I don't know how to answer something), roll dice (type "roll {sides}"), and hopefully more soon ;)'`
  };
}

export default {
  ID,
  lexicon,
  matchRules,
  reply,
};