import { Directions } from './../Types';
import SnakeBrain from '../SnakeBrain';
import { headAndTailSnake1 } from '../../util/__tests__/snekspec.scenarios';
import getGameStateFromMock from '../../util/snekspec';

describe('GameState Class Tests', () => {
  test('Class creation and default move', () => {
    // Arrange & Act
    const mockGameStateObject = getGameStateFromMock(headAndTailSnake1);
    const snakeBrain = new SnakeBrain(mockGameStateObject);
    const direction = snakeBrain.decide().act();

    // Assert
    expect(direction).toBe(Directions.LEFT);
  });
});
