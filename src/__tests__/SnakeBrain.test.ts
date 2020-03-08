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
    const mockGameStateObject = getGameStateFromMock(headAndTailSnake1, {
      turn: 1,
    });
    const direction = new SnakeBrain(mockGameStateObject, false).decide().act();
    // Assert
    expect(direction).toBe(Directions.LEFT);
  });

  // TODO: update this when we get the eat() function going
  test('First move, you down?', () => {
    // Arrange & Act
    const mockGameStateObject = getGameStateFromMock(headAndTailSnake1, {
      turn: 1,
    });
    const direction = new SnakeBrain(mockGameStateObject, false).decide().act();
    // Assert
    expect(direction).toBe(Directions.LEFT);
  });

  test('Shout, shout, let it all out', () => {
    // Arrange & Act
    const mockGameStateObject = getGameStateFromMock(snakesAndFood1, {
      turn: 2,
    });

    const direction = new SnakeBrain(mockGameStateObject, true).decide().act();
    // Assert
    expect(direction).toBe(Directions.DOWN);
  });

  test('Go for the headbutt, should attack smaller weaker sneks', () => {
    const direction = new SnakeBrain(
      getGameStateFromMock(
        `-----------
         -----------
         ------V0---
         ------v----
         ----S-U----
         ----t------
         ----t------
         ----T------
         --0--------
         -----------
         -----------`,
        { turn: 8 }
      ),
      false
    )
      .decide()
      .act();
    expect(direction).toBe(Directions.RIGHT);
  });

  test("Mouth is alive with juices like wine, and I'm hungry like the wolf", () => {
    let direction = new SnakeBrain(
      getGameStateFromMock(
        `-----------
         -----------
         -------0---
         -----------
         ----S------
         ----t------
         ----T------
         -----------
         --0--------
         -----------
         -----------`,
        { turn: 8 }
      ),
      false
    )
      .decide()
      .act();
    expect(direction).toBe(Directions.UP);
    direction = new SnakeBrain(
      getGameStateFromMock(
        `-----------
        -----------
        -------0---
        ----S------
        ----s------
        ----T------
        -----------
        -----------
        --0--------
        -----------
        -----------`,
        { turn: 9 }
      ),
      false
    )
      .decide()
      .act();
    expect(direction).toBe(Directions.UP);
    direction = new SnakeBrain(
      getGameStateFromMock(
        `-----------
        -----------
        ----S--0---
        ----s------
        ----T------
        -----------
        -----------
        -----------
        --0--------
        -----------
        -----------`,
        { turn: 8 }
      ),
      false
    )
      .decide()
      .act();
    expect(direction).toBe(Directions.RIGHT);
    direction = new SnakeBrain(
      getGameStateFromMock(
        `-----------
        -----------
        ----sS-0---
        ----T------
        -----------
        -----------
        -----------
        -----------
        --0--------
        -----------
        -----------`,
        { turn: 8 }
      ),
      false
    )
      .decide()
      .act();
    expect(direction).toBe(Directions.RIGHT);
  });

  test('if we can chase an enemy tail we should', () => {
    const direction = new SnakeBrain(
      getGameStateFromMock(
        `-T-----
         ttvvU--
         tSV----
         tt-----
         -------
         -------
         -------`,
        { turn: 8, height: 7, width: 7 }
      ),
      false
    )
      .decide()
      .act();
    expect(direction).toBe(Directions.RIGHT);
  });
});
