import { ISnake, ICoordinate, Directions } from '../Types';
import Pathfinder from '../Pathfinder';

/**
 * @param {Pathfinder} PF - Pathfinder class initialized with game state
 * @param {ISnake[]} snakes - Array of all snakes on the board
 * @param {ISnake} us - our snake
 * @returns {Directions} returns the next direction
 */
export const chaseTail = (
  PF: Pathfinder,
  snakes: ISnake[],
  us: ISnake
): Directions => {
  const head: ICoordinate = us.body[0];
  const enemyTail: ICoordinate = snakes[0].body[snakes[0].body.length - 1];

  return PF.getStep(head, enemyTail);
};

export default chaseTail;
