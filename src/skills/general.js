import nlp from 'compromise';
import { set, get, random } from 'lodash';
import wiki from 'wikijs';

const ID = 'general';

const lexicon = {};

const matchRules = [
  '*' // The fallback :)
];

const snark = [
  () => `Well, it seems I'm not that dumb after all ;)`,
  () => `Now, ask me something harder :P`,
  (input, ctx) => `"Ooooh, look at me, ${ctx.intro.name ? 'I\'m ' + ctx.intro.name + ' and ' : ''} I'm sooo smart". Thought you got me? Think again.`
];

const reply = async (input, context) => {
  const timesMatched = get(context, 'general.matched', 0);
  set(context, 'general.matched', timesMatched + 1);

  localStorage.setItem('bjs-bot-context', JSON.stringify(context));

  const query = nlp(input).nouns().out('array').join(' ');

  const snarkChance = random(0, 1);

  try {
    const direct = await wiki().page(query);
    if (direct) {
      const summary = await direct.summary();
      return {
        mode: 'text',
        value: `${summary.split('.')[0]}. ${ snarkChance > .6 ? snark[random(0, snark.length - 1)](input, context) : '' }`
      };
    } else {
      const search = await wiki().search(query);
      if (search.results.length > 0) {
        const page = await wiki().page(search.results[0]);
        const summary = await page.summary();

        return {
          mode: 'text',
          value: `${summary.split('.')[0]}. ${ snarkChance > .6 ? snark[random(0, snark.length - 1)](input, context) : '' }`
        };
      }
    }
  } catch (e) {
    return {
      mode: 'text',
      value: `Well, not even Wikipedia knows what you're on about. Maybe it's time to put that beer down now`
    }
  }
};

export default {
  ID,
  lexicon,
  matchRules,
  reply
};