import { ISnake, ICoordinate, Directions } from '../Types';
import Pathfinder from '../Pathfinder';
import { manhattanDistance, getOtherSnakes, theSnakeJustAte } from '../helpers';

/**
 * @param {Pathfinder} PF - Pathfinder class initialized with game state
 * @param {ISnake[]} snakes - Array of all snakes on the board
 * @param {ISnake} us - our snake
 * @returns {Directions} returns the next direction
 */
export const chaseEnemyTail = (
  PF: Pathfinder,
  us: ISnake,
  snakes: ISnake[]
): Directions => {
  let others = getOtherSnakes(us, snakes);

  // Don't chase the tails of snakes that just ate, because
  // their tails won't move next turn
  others = others.filter(snake => !theSnakeJustAte(snake));

  if (others.length === 0) {
    return null;
  }

  const tails: ICoordinate[] = others.map((snake: ISnake) => {
    return snake.body[snake.body.length - 1];
  });

  const head: ICoordinate = us.body[0];
  let enemyTail = tails[0];
  let minDist = manhattanDistance(head, tails[0]);

  tails.forEach((tail: ICoordinate) => {
    const currDist = manhattanDistance(head, tail);
    minDist = currDist < minDist ? currDist : minDist;
    enemyTail = currDist === minDist ? tail : enemyTail;
  });

  return PF.getStep(head, enemyTail);
};

export default chaseEnemyTail;
