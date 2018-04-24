import { set, get, random } from 'lodash';

const ID = 'greet';

const lexicon = {};

const matchRules = [
  '(hi|hello|ahoy|greetings|#Expression) bot?'
]

const replies = [
  (input, ctx) => { return { mode: 'text', value: get(ctx, 'intro.name') ? `Hello ${ctx.intro.name.split(' ')[0]}.` : `Beep boop, I'm a dumb bot. Who are you?`} },
  () => ({ mode: 'text', value: 'Hi there.' }),
  () => ({ mode: 'text', value: 'What\'s up?' }),
  () => ({ mode: 'img', value: 'https://media.giphy.com/media/FBeSx3itXlUQw/giphy.gif' }),
  () => ({ mode: 'img', value: 'https://media.giphy.com/media/BVStb13YiR5Qs/giphy.gif' })
]

const reply = (input, context) => {
  const timesMatched = get(context, 'greet.matched', 0);
  set(context, 'greet.matched', timesMatched + 1);

  localStorage.setItem('bjs-bot-context', JSON.stringify(context));

  const replyRoll = random(0, replies.length - 1);

  return replies[replyRoll](input, context);
}

export default {
  ID,
  lexicon,
  matchRules,
  reply
}