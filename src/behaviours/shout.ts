import { ISnake, IBoard, ICoordinate, Directions } from '../Types';
import Pathfinder from '../Pathfinder';

/**
 * Shout, shout, let it all out!
 *
 * @param {IBoard} board - the board state
 * @param {ISnake} us - our snake
 * @returns {Directions} returns the next direction
 */
export const shout = (board: IBoard, us: ISnake): Directions => {
  const snakes: ISnake[] = board.snakes;
  const pf = new Pathfinder(board, snakes);

  const head: ICoordinate = us.body[0];
  const neck: ICoordinate = us.body[1];

  return pf.getStep(head, neck);
}

export default shout;