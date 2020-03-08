import { IGameState, ISnake, IBoard, IGame, Directions } from './Types';
import { turtle } from './behaviours/turtle';
import { canKillNemesis, getNemesis } from './helpers';
import { attackHead } from './behaviours/attackHead';
import Pathfinder from './Pathfinder';

// I hate writing "this." all the time.
let game: IGame;
let turn: number;
let board: IBoard;
let selfDestruct: boolean;
let us: ISnake;
let nemesis: ISnake;
let everybody: ISnake[];

export default class SnakeBrain {
  private action: Directions;

  constructor(gameStateResponse: IGameState, exploited: boolean) {
    game = gameStateResponse.game;
    turn = gameStateResponse.turn;
    board = gameStateResponse.board;
    // Not sure why we left this in here?
    // TODO: remove self-destruct
    selfDestruct = exploited;
    us = gameStateResponse.you;
    everybody = board.snakes;
    nemesis = getNemesis(us, everybody);
  }

  /**
   * This function will determine what behaviours to act upon depending on game state.
   *
   * @returns {SnakeBrain}
   */
  public decide(): SnakeBrain {
    // Logic for start of game.
    // eslint-disable-next-line array-element-newline
    console.log({ turn, game, board, us });

    // Instantiate Pathfinder with board and snakes
    const pf = new Pathfinder(board, everybody);

    // Try some moves out, see what feels good
    const cower = turtle(pf, us);
    const murder = attackHead(pf, us, nemesis);

    if (selfDestruct) { // OH NO! We've been hacked!
      console.log('AHHHHHH');
      this.action = cower;
    } else if ( // Murder was the case 
      canKillNemesis(us, everybody)
      && murder
    ) {
      this.action
    } else if () {

    }

    // Default action
    this.action = this.action || Directions.LEFT;
    return this;
  }

  /**
   * The direction this snake will take in its short but exciting life.
   *
   * @returns {Directions}
   */
  public act(): Directions {
    return this.action;
  }
}
