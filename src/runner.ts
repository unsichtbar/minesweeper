import Minesweeper from './minesweeper'
import { DIFFICULTY } from './minesweeper'
let game = new Minesweeper(DIFFICULTY.HARD);
console.log(game.tile({x: 12, y:12}))