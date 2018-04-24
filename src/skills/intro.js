import nlp from 'compromise';
import { set, get, random } from 'lodash';

const ID = 'intro';

const lexicon = {};

const matchRules = [
  '(my|i|call) name? (am|me)? *',
];

const reply = (input, context) => {
  const timesMatched = get(context, 'intro.matched', 0);
  const people = nlp(input).people().out('array');
  
  set(context, 'intro.matched', timesMatched + 1);
  set(context, 'intro.name', people.join(' '));

  localStorage.setItem('bjs-bot-context', JSON.stringify(context));

  return {
    mode: 'text',
    value: `Nice to meet you ${people[0]}`,
  }
};

export default {
  ID,
  lexicon,
  matchRules,
  reply
};
