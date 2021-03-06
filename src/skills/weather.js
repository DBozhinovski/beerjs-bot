import WeatherMan from 'weather-man';

const ID = 'weather';

const lexicon = {};

const wm = new WeatherMan(WeatherMan.OPENWEATHERMAP, process.env.REACT_APP_OWM_KEY);
const SK_LAT = 41.99735;
const SK_LON = 21.428;

const matchRules = [
  '(what|tell|how) * (weather|outside)'
];


const reply = async (input, context) => {
  const res = await wm.getCurrent(SK_LAT, SK_LON);

  return {
    mode: 'text',
    value: `It's ${res.temperature} degrees (the proper ones) outside, ${res.condition}.`
  };
};

export default {
  ID,
  lexicon,
  matchRules,
  reply,
};

