// this module will examine the board state from components/Board.jsx
// and determine the state of the board on the next turn
// it will return that object

import { CUBE_SIZE, SEED_LIFE_RATIO, BOARD_SIZE,
  MIN_LIVING_NEIGHBORS, MAX_LIVING_NEIGHBORS,
  LIVING_NEIGHBORS_TO_BIRTH } from './containers/SidebarContainer.jsx';

//  counts number of living neighbors for each cell
//  sets the 'isAliveNextTurn' based on the count
export function calcTurn (boardCells) {
  let newBoardCells = boardCells;

  newBoardCells.forEach( cellArr => {
    cellArr.forEach( cellArr => {
      cellArr.forEach( cell => {
        let livingNeighbors = 0;
        cell.neighbors.forEach( cell => {
          if (cell.isAlive) livingNeighbors++;
        });

        // set to dead if outside max/min
        if (livingNeighbors < MIN_LIVING_NEIGHBORS ||
          livingNeighbors > MAX_LIVING_NEIGHBORS) {
            cell.isAliveNextTurn = false;
          } else { // if inside max/min, life status does not change
            cell.isAliveNextTurn = cell.isAlive;
          }

        if (!cell.isAlive && livingNeighbors === LIVING_NEIGHBORS_TO_BIRTH) {
          cell.isAliveNextTurn = true;
        }

      });
    });
  });

  //  iterates over the entire game board
  //  and sets all life flags
  newBoardCells.forEach( cellArr => {
    cellArr.forEach( cellArr => {
      cellArr.forEach( cell => {
        cell.isAlive = cell.isAliveNextTurn;
        cell.isAliveNextTurn = null;
        cell.setStatus();
      });
    });
  });

  return newBoardCells;
}
