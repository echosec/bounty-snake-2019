import {
  candidateSnakesAndFoodFromMock,
  isAdjacent,
  untagleSnake,
  getGameStateFromMock,
} from '../snekspec';

// eslint-disable-next-line prettier/prettier
const scenario1 = 
`-----------
---0-------
-----------
--T------0-
--tS-------
--tt---0---
-----------
--------U--
---0----v--
-----Vvvv--
-----------`;
// eslint-disable-next-line prettier/prettier
const scenario2 = 
`-----------
-----------
-----------
-----------
----S------
-----------
-----------
-----------
-----------
-----------
-----------`;
// eslint-disable-next-line prettier/prettier
const scenario3 = 
`-----------
-----------
-----------
-----------
----S------
----T------
-----------
-----------
-----------
-----------
-----------`;
// eslint-disable-next-line prettier/prettier
const scenario4 = 
`-----------
-----------
-----------
-----------
----T------
----S------
-----------
-----------
-----------
-----------
-----------`;

describe('snake scenario parsing and game state generation tests', (): void => {
  it('should parse the scenario and generate food', (): void => {
    const candidateSnakesAndFood = candidateSnakesAndFoodFromMock(
      scenario1,
      11,
      11
    );
    const expectedFood = [
      { x: 3, y: 1 },
      { x: 9, y: 3 },
      { x: 7, y: 5 },
      { x: 3, y: 8 },
    ];
    expect(candidateSnakesAndFood.food).toEqual(
      expect.arrayContaining(expectedFood)
    );
    expect(candidateSnakesAndFood.food.length).toEqual(expectedFood.length);
  });

  it('should parse the scenario and generate snake candidates', (): void => {
    const candidateSnakesAndFood = candidateSnakesAndFoodFromMock(
      scenario1,
      11,
      11
    );
    const expectedSnakes = {
      s: [
        { x: 3, y: 4 },
        { x: 3, y: 5 },
        { x: 2, y: 5 },
        { x: 2, y: 4 },
        { x: 2, y: 3 },
      ],
      u: [
        { x: 8, y: 7 },
        { x: 8, y: 8 },
        { x: 8, y: 9 },
        { x: 7, y: 9 },
        { x: 6, y: 9 },
        { x: 5, y: 9 },
      ],
    };
    expect(candidateSnakesAndFood.snakes).toEqual(
      expect.objectContaining({
        s: expect.arrayContaining(expectedSnakes.s),
        u: expect.arrayContaining(expectedSnakes.u),
      })
    );
    expect(candidateSnakesAndFood.snakes.s[0]).toEqual(expectedSnakes.s[0]);
    expect(candidateSnakesAndFood.snakes.s[4]).toEqual(expectedSnakes.s[4]);
    expect(candidateSnakesAndFood.snakes.u[0]).toEqual(expectedSnakes.u[0]);
    expect(candidateSnakesAndFood.snakes.u[5]).toEqual(expectedSnakes.u[5]);
  });
});

describe('snakes get untaggled', (): void => {
  it('should test adjacency', (): void => {
    expect(isAdjacent({ x: 8, y: 7 }, { x: 8, y: 7 })).toBe(false);
    expect(isAdjacent({ x: 8, y: 7 }, { x: 7, y: 7 })).toBe(true);
    expect(isAdjacent({ x: 8, y: 7 }, { x: 7, y: 8 })).toBe(false);
    expect(isAdjacent({ x: 8, y: 7 }, { x: 8, y: 8 })).toBe(true);
    expect(isAdjacent({ x: 8, y: 8 }, { x: 8, y: 7 })).toBe(true);
  });

  it('should untangle snake paths', (): void => {
    const candidateSnakesAndFood = candidateSnakesAndFoodFromMock(
      scenario1,
      11,
      11
    );
    const untagledSnakeS = untagleSnake(candidateSnakesAndFood.snakes.s);
    const untagledSnakeU = untagleSnake(candidateSnakesAndFood.snakes.u);
    expect(untagledSnakeS).toEqual([
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 2, y: 5 },
      { x: 2, y: 4 },
      { x: 2, y: 3 },
    ]);
    expect(untagledSnakeU).toEqual([
      { x: 8, y: 7 },
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 7, y: 9 },
      { x: 6, y: 9 },
      { x: 5, y: 9 },
    ]);
  });
});

describe('generate a game state from a scenario', (): void => {
  it('should generate a valid game state', (): void => {
    const gameState = getGameStateFromMock(scenario1);
    expect(gameState).toEqual({
      game: {
        id: 'generated-scenario',
      },
      turn: 1,
      board: {
        height: 11,
        width: 11,
        food: [
          { x: 3, y: 1 },
          { x: 9, y: 3 },
          { x: 7, y: 5 },
          { x: 3, y: 8 },
        ],
        snakes: [
          {
            id: 's',
            name: 's',
            health: 90,
            body: [
              { x: 3, y: 4 },
              { x: 3, y: 5 },
              { x: 2, y: 5 },
              { x: 2, y: 4 },
              { x: 2, y: 3 },
            ],
          },
          {
            id: 'u',
            name: 'u',
            health: 90,
            body: [
              { x: 8, y: 7 },
              { x: 8, y: 8 },
              { x: 8, y: 9 },
              { x: 7, y: 9 },
              { x: 6, y: 9 },
              { x: 5, y: 9 },
            ],
          },
        ],
      },
      you: {
        id: 's',
        name: 's',
        health: 90,
        body: [
          { x: 3, y: 4 },
          { x: 3, y: 5 },
          { x: 2, y: 5 },
          { x: 2, y: 4 },
          { x: 2, y: 3 },
        ],
      },
    });
  });

  it('should generate a single snake', (): void => {
    const gameState = getGameStateFromMock(scenario2);
    expect(gameState).toEqual({
      game: {
        id: 'generated-scenario',
      },
      turn: 1,
      board: {
        height: 11,
        width: 11,
        food: [],
        snakes: [
          {
            id: 's',
            name: 's',
            health: 90,
            body: [{ x: 4, y: 4 }],
          },
        ],
      },
      you: {
        id: 's',
        name: 's',
        health: 90,
        body: [{ x: 4, y: 4 }],
      },
    });
  });

  it('should generate a head/tail snake', (): void => {
    const gameState = getGameStateFromMock(scenario3);
    expect(gameState).toEqual({
      game: {
        id: 'generated-scenario',
      },
      turn: 1,
      board: {
        height: 11,
        width: 11,
        food: [],
        snakes: [
          {
            id: 's',
            name: 's',
            health: 90,
            body: [
              { x: 4, y: 4 },
              { x: 4, y: 5 },
            ],
          },
        ],
      },
      you: {
        id: 's',
        name: 's',
        health: 90,
        body: [
          { x: 4, y: 4 },
          { x: 4, y: 5 },
        ],
      },
    });
  });
  it('should generate a head/tail snake upside down', (): void => {
    const gameState = getGameStateFromMock(scenario4);
    expect(gameState).toEqual({
      game: {
        id: 'generated-scenario',
      },
      turn: 1,
      board: {
        height: 11,
        width: 11,
        food: [],
        snakes: [
          {
            id: 's',
            name: 's',
            health: 90,
            body: [
              { x: 4, y: 5 },
              { x: 4, y: 4 },
            ],
          },
        ],
      },
      you: {
        id: 's',
        name: 's',
        health: 90,
        body: [
          { x: 4, y: 5 },
          { x: 4, y: 4 },
        ],
      },
    });
  });
});
