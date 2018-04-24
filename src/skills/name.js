import { get, set, random } from 'lodash';

const ID = 'name';

const lexicon = {};

const matchRules = [
  'what * name',
  '(how|what) should I call you',
  'shirley',
  'surely'
];

const replies = [
  () => `My name is Inigo de Botoya... nah, wait nevermind. Just Bot is fine. And don't call me Shirley!`,
  () => `Anything works, 'Bot' is appreciated, but don't call me Shirley.`,
]

const reply = (input, context) => {
  const timesMatched = get(context, 'name.matched', 0);
  set(context, 'name.matched', timesMatched + 1);

  if (input.toLowerCase().includes('surely') || input.toLowerCase().includes('shirley')) {
    return {
      mode: 'img',
      value: 'https://media.giphy.com/media/3oKHWBujeYZcz0SaTm/giphy.gif'
    }
  } 

  return {
    mode: 'text',
    value: replies[random(0, replies.length - 1)](input, context)
  };
};

export default {
  ID,
  lexicon,
  matchRules,
  reply
};
