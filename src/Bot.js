import nlp from 'compromise';
import skills from './skills/';
import { get, set } from 'lodash';

const context = localStorage['bjs-bot-context'] ? JSON.parse(localStorage['bjs-bot-context']) : {};

const getReply = async (input) => {
  const skillMatch = skills.find((s) => {
    const ruleMatch = s.matchRules.find(r => nlp(input).normalize().match(r).found);

    if (ruleMatch) {
      return true;
    }
  });

  console.log(nlp(input).debug());
  if (skillMatch) {
    const topicHistory = get(context, 'topics') || [];
    topicHistory.push(skillMatch.ID);
    set(context, 'topics', topicHistory);
    const reply = await skillMatch.reply(input, context);
    return reply;
  } else {
    return { mode: 'text', value: 'Beep Boop! (type help)' };
  }

};

export default {
  getReply,
};