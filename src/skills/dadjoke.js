// The ID of the skill
const ID = 'dadjoke';

// No custon lexicon / overrides
const lexicon = {};

// If we encounter the word "joke", we trigger the reply
const matchRules = [
  '(know|tell)? (any|me)? a? (joke|jokes)'
];


const reply = async (input, context) => {
  // We fetch a random dadjoke in plaintext,
  // identyfing as beerbot (just being a good internet citizen)
  const reply = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "text/plain",
      "User-Agent": "beerbot"
    }
  });

  // "Unpack" the joke from the fetch using text 
  // (since we requested it in plaintext)
  const joke = await reply.text();

  // Return the joke for rendering on screen
  return {
    mode: 'text',
    value: joke
  };
};

export default {
  ID,
  lexicon,
  matchRules,
  reply,
};