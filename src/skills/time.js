import moment from 'moment';
import { set, get, random } from 'lodash';
import ordinal from 'ordinal-js';

const ID = 'time'

const lexicon = {};

const matchRules = [
  'what? * time',
];

const snark = [
  () => 'Are you ok?',
  () => 'And they say chatbots are boring...',
  () => 'C\'mon, ask something different, I believe in you!',
  () => 'We can talk about other stuff, you know.',
  () => 'Well, obviously I can\'t stop you from asking, but it is getting a bit old now.',
  (input, ctx) => `Also, fun fact - this is the ${ordinal.toOrdinal(ctx.time.matched)} time you're asking me that. 🤨`,  
]

const reply = (input, context) => {
  const timesMatched = get(context, 'time.matched', 0);
  set(context, 'time.matched', timesMatched + 1);

  localStorage.setItem('bjs-bot-context', JSON.stringify(context));

  const snarkChance = random(0, 1);

  if (snarkChance > .8 && timesMatched > 5) {
    const snarkReply = random(0, snark.length - 1);
    return {
      mode: 'text',
      value: `It's ${moment().clone().format('HH:mm')}. ${snark[snarkReply](input, context)}`
    };
  }

  return {
    mode: 'text',
    value: `It's ${moment().clone().format('HH:mm')}.`
  };
};

export default {
  ID,
  lexicon,
  matchRules,
  reply
}