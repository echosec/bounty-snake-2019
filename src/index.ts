import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import {
  fallbackHandler,
  genericErrorHandler,
  poweredByHandler,
} from './handlers';
import SnakeBrain from './SnakeBrain';

const app = express();

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', process.env.PORT || 9001);

app.enable('verbose errors');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(poweredByHandler);

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
  console.log(request.body);

  // Response data
  const data = {
    color: Math.round(Math.random()) === 1 ? '#1A2F4B' : '#EB7963',
  };

  return response.json(data);
});

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
  const currentGameState = request.body;
  const brain = new SnakeBrain(currentGameState, false);

  brain.decide();

  const direction = brain.act();
  // Response data
  const data = {
    move: direction, // one of: ['up','down','left','right']
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

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler);
app.use(genericErrorHandler);

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
