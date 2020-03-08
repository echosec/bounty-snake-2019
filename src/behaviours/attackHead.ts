import { ISnake, IBoard, Directions, ICoordinate } from '../Types';
import { getNemesis } from '../helpers';
import Pathfinder from '../Pathfinder';

/**
 * Snek attack!
 *
 * @param {IBoard} board - the board state
 * @param {ISnake} us - our snake
 * @returns {Directions} - returns the next direction
 */
export const attackHead = (
  pf: Pathfinder,
  us: ISnake,
  enemySnake: ISnake
): Directions => {
  const ourHead: ICoordinate = us.body[0];
  const enemyHead: ICoordinate = enemySnake.body[0];

  return pf.getStep(ourHead, enemyHead);
};
