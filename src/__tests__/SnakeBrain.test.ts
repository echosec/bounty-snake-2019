import { Directions } from './../Types';
import SnakeBrain from '../SnakeBrain';
import { headAndTailSnake1 } from '../../util/__tests__/snekspec.scenarios';
import getGameStateFromMock from '../../util/snekspec';

describe('GameState Class Tests', () => {
  test('Class creation and default move', () => {
    // Arrange & Act
    const mockGameStateObject = getGameStateFromMock(headAndTailSnake1);
    const direction = new SnakeBrain(mockGameStateObject).decide(mockGameStateObject, false).act();
    // Assert
    expect(direction).toBe(Directions.LEFT);
  });

  test('Call turtle when giveUp = true is passed to decide', () => {
    // Arrange & Act
    const mockGameStateObject = getGameStateFromMock(headAndTailSnake1);
    const direction = new SnakeBrain(mockGameStateObject).decide(mockGameStateObject, true).act();

    // Assert
    expect(direction).toBe(Directions.DOWN);
  });
});
