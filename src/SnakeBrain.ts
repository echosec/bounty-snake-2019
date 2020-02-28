import { IGameState, ISnake, IBoard, IGame, Directions } from './Types';
// I hate writing this. all the time.
let game: IGame;
let turn: number;
let board: IBoard;
let us: ISnake;

export default class SnakeBrain {
  private action: Directions;

  constructor(gameStateResponse: IGameState) {
    game = gameStateResponse.game;
    turn = gameStateResponse.turn;
    board = gameStateResponse.board;
    us = gameStateResponse.you;
  }

  public decide(): SnakeBrain {
    // Logic for start of game.
    console.log(turn);

    if (turn === 0) {
      // Eat something, you look hungry.
      this.action = Directions.DOWN;
    }

    // Default action
    this.action = Directions.LEFT;
    return this;
  }

  public act(): Directions {
    return this.action;
  }
}
