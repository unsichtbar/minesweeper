import Minesweeper from './minesweeper'
import { DIFFICULTY } from './minesweeper'
let game = new Minesweeper(DIFFICULTY.HARD);
console.table(game.tile({x: 0, y:0}))
