import WeatherMan from 'weather-man';

const ID = 'weather';

const lexicon = {};

const wm = new WeatherMan(WeatherMan.OPENWEATHERMAP, process.env.REACT_APP_OWM_KEY);
const SK_LAT = 41.99735;
const SK_LON = 21.428;

const matchRules = [
];


const reply = async (input, context) => {
  return {
    mode: 'text',
    value: `I don't know how to do that (yet).`
  };
};

export default {
  ID,
  lexicon,
  matchRules,
  reply,
};

