import { ISnake, IBoard, ICoordinate, Directions, Matrix } from '../Types';
import Pathfinder from '../Pathfinder';
import { firstToFood } from '../helpers';
import { chaseEnemyTail } from './chaseEnemyTail';
import chaseTail from './chaseTail';

/**
 * Go for the food
 * @param PF - Pathfinder instance
 * @param us - our snake
 * @param food - the food to eat
 */
function eat(PF: Pathfinder, us: ISnake, food: ICoordinate): Directions {
  const head: ICoordinate = us.body[0];

  return PF.getStep(head, food);
}

/**
 * Are we trapped if we eat this food?s
 * @param {Pathfinder} - PF - our pathfinder class.
 * @param {ISnake[]} snakes - dastardly foes.
 * @param {ISnake} futureUs - will i be pretty, will i be rich?
 * @returns {Directions} returns the next direction
 */
function isItADeadEnd(
  PF: Pathfinder,
  futureUs: ISnake,
  snakes: ISnake[]
): boolean {
  console.log(futureUs);
  const pathToEnemyTail = chaseEnemyTail(PF, futureUs, snakes);
  const pathToOurTail = chaseTail(PF, futureUs);

  return pathToEnemyTail || pathToOurTail ? false : true;
}

/**
 * Here we shift our snake as though it has moved to the
 * food and check whether it has a safe path away from there.
 * Not perfect, because we don't move the other snakes,
 * but whatever. It is mostly just annoying to watch a snake
 * eat food and crash directly into a wall the next turn.
 * @param pathToSnack - the path to food
 * @param us - us!
 * @param board - the game board
 */
function areWeTrapped(pathToSnack: Matrix, us: ISnake, board: IBoard): boolean {
  // This is us after we hit our fitness goals
  const futureBody: ICoordinate[] = [];
  // Map where our body will be when we eat food.
  for (const coordinate of pathToSnack) {
    futureBody.push({ x: coordinate[0], y: coordinate[1] });
  }

  // Get the index of our snake in the snake array
  const indexOfUs = board.snakes.findIndex(snake => snake.id === us.id);

  // Predict the future wooooOOOOOooooOOOOOooo
  const futureUs: ISnake = { ...us };
  futureUs.body = futureBody;
  const futureSnakes: ISnake[] = [...board.snakes];
  futureSnakes[indexOfUs] = futureUs;
  const futureBoard: IBoard = {
    ...board,
    snakes: futureSnakes,
  };

  // We need to instantiate the Pathfinder,
  // with our snake shifted to its future position
  const PF = new Pathfinder(futureBoard, futureSnakes, futureUs);
  // Make sure we have somewhere to go after eating. We will check if there is a snake tail to chase.
  return isItADeadEnd(PF, futureUs, futureSnakes);
}

/**
 * This behaviour seeks out safe food. We will only move to food if
 * there is a safe path away from it.
 * @param {Pathfinder} PF - Pathfinder class initialized with game state
 * @param {IBoard} board - the board state
 * @param {ISnake} us - our snake
 * @returns {Directions} returns the next direction
 */
export const seekSafestFood = (
  PF: Pathfinder,
  board: IBoard,
  us: ISnake
): Directions => {
  try {
    const snakes: ISnake[] = board.snakes;
    const head: ICoordinate = us.body[0];
    const { food: foodArray } = board;

    let pathToSafestFood: Matrix = [];
    let safestFood: ICoordinate = null;
    // For each food item we check:
    // 1. Are we closer than any other snake.
    // 2. After we eat the food do we have a path to another snakes tail (escape route)
    // If so, we chonk.
    for (const snakeSnack of foodArray) {
      const pathToSnack = PF.getFullPath(head, snakeSnack);
      // If there's no path to food, continue
      if (!pathToSnack) {
        continue;
      }
  
      const winnerWinnerChickenDinner = firstToFood(us, snakes, snakeSnack, PF);
      const deadEnd = areWeTrapped(pathToSnack, us, board);

      // If we won't make it there first, continue
      if (!winnerWinnerChickenDinner || deadEnd) {
        continue;
      }

      if (
        pathToSafestFood.length === 0 ||
        pathToSnack.length < pathToSafestFood.length
      ) {
        pathToSafestFood = pathToSnack;
        safestFood = snakeSnack;
      }
    }

    if (safestFood) {
      return eat(PF, us, safestFood);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export default seekSafestFood;
