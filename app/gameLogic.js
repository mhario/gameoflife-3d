import { MIN_LIVING_NEIGHBORS, MAX_LIVING_NEIGHBORS,
  LIVING_NEIGHBORS_TO_BIRTH } from './containers/SidebarContainer.jsx';

// pass the board to this function
// returns the board as it appears the following turn
export function calcTurn (boardCells) {
  let newBoardCells = boardCells;

  //  counts number of living neighbors for each cell on the board
  //  sets the 'isAliveNextTurn' based on the count
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
  //  and sets all life flags to next turn state
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
