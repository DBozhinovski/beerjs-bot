import nlp from 'compromise';
import { get, set, random } from 'lodash';

const ID = 'roll';

const lexicon = {};

const matchRules = [
  'roll *'
];

const reply = (input, context) => {
  const timesMatched = get(context, 'roll.matched', 0);
  set(context, 'roll.matched', timesMatched + 1);

  localStorage.setItem('bjs-bot-context', JSON.stringify(context));

  const die = nlp(input).values().toNumber().out('text');

  return {
    mode: 'text',
    value: `Rolling d${die.trim()}... And you get a ${random(1, die)}.`
  };
};

export default {
  ID,
  lexicon,
  matchRules,
  reply,
};

