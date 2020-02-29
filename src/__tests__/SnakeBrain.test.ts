import {
  headAndTailSnake1,
  snakesAndFood1,
} from '../../util/__tests__/snekspec.scenarios';
import getGameStateFromMock from '../../util/snekspec';
import SnakeBrain from '../SnakeBrain';
import { Directions } from './../Types';

describe('GameState Class Tests', () => {
  test('Class creation from mock and default move', () => {
    // Arrange & Act
    const mockGameStateObject = getGameStateFromMock(headAndTailSnake1);
    const direction = new SnakeBrain(mockGameStateObject).decide().act();
    // Assert
    expect(direction).toBe(Directions.LEFT);
  });

  test('First move, you down?', () => {
    // Arrange & Act
    const mockGameStateObject = getGameStateFromMock(headAndTailSnake1, {
      turn: 1,
    });
    const direction = new SnakeBrain(mockGameStateObject).decide().act();
    // Assert
    expect(direction).toBe(Directions.DOWN);
  });

  test('Shout, shout, let it all out', () => {
    // Arrange & Act
    const mockGameStateObject = getGameStateFromMock(snakesAndFood1, {
      turn: 10,
    });
    mockGameStateObject.board.snakes[0].shout = 'TURTLE COWER';

    // TODO Would love to be able to spyOn a behaviour here.

    const direction = new SnakeBrain(mockGameStateObject).decide().act();
    // Assert
    expect(direction).toBe(Directions.DOWN);
  });
});
