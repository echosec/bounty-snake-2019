import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import {
  fallbackHandler,
  genericErrorHandler,
  poweredByHandler,
} from './handlers';
import SnakeBrain from '../src/SnakeBrain';
import { IGameState } from '../src/Types';

const app = express();

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', process.env.PORT || 9001);

app.enable('verbose errors');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(poweredByHandler);
const urlencodedParser = bodyParser.urlencoded({ extended: true });

// Not sure if this is the best idea! 👀
let giveUp: boolean = false;

// Initialize snake brain
let snakeBrain: SnakeBrain;

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // Reset giveUp whenever a new game starts
  giveUp = false;

  // Wake up snake brain and tell it to start playing!
  const initialGameState: IGameState = request.body;
  snakeBrain = new SnakeBrain(initialGameState);

  // Response data
  const data = {
    color: '#DFFF00',
  };

  return response.json(data);
});

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // Pass current game state and whether it's quittin time
  const currentGameState: IGameState = request.body;
  snakeBrain.decide(currentGameState, giveUp);

  // Response data
  const data = {
    move: 'up', // one of: ['up','down','left','right']
  };

  return response.json(data);
});

app.post('/end', (request, response) => {
  console.log(request.body);

  // NOTE: Any cleanup when a game is complete.
  return response.json({});
});

app.post('/ping', (request, response) => {
  console.log(request.body);

  // Used for checking if this snake is still alive.
  return response.json({});
});

app.get('/version', (_, response) => {
  response.status(200);
  return response.send(process.env.VERSION || 'undefined');
});

app.post('/shout', urlencodedParser, (request, response) => {
  let data: string = "Didn't quite get that. Come again?";

  if (request.body.command === 'boo') {
    giveUp = true;
    data = 'Turtle cower! 🐢 🐢 🐢 ';
  }

  return response.json(data);
});

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler);
app.use(genericErrorHandler);

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
