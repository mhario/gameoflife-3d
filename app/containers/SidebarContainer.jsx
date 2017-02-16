import React, { Component } from 'react';
import { Sidebar } from '../components/Sidebar';

import { allCells, init, animate } from '../components/Board';
import { calcTurn, nextTurn } from '../gameLogic';

export let SEED_LIFE_RATIO = .25,
  MIN_LIVING_NEIGHBORS = 2,
  MAX_LIVING_NEIGHBORS = 3,
  LIVING_NEIGHBORS_TO_BIRTH = 3;

export let CUBE_SIZE = 200;
export let BOARD_SIZE = 5;


export class SidebarContainer extends Component {

  constructor () {
    super ();
    this.state = {
      drawnBoard: false,
      boardSize: 5,
      minLiving: MIN_LIVING_NEIGHBORS,
      maxLiving: MAX_LIVING_NEIGHBORS,
      ratio: SEED_LIFE_RATIO }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoardSize = this.handleBoardSize.bind(this);
    this.changeNums = this.changeNums.bind(this);
    this.handleLifeRatio = this.handleLifeRatio.bind(this);
    this.runTurns = this.runTurns.bind(this);
  }

  handleBoardSize (evt) {
    const value = evt.target.value;
    this.setState({boardSize: value});
    BOARD_SIZE = value;
  }

  handleLifeRatio (evt) {
    const value = evt.target.value;
    this.setState({ratio: value});
    SEED_LIFE_RATIO = value;
  }

  cycleTurn () {
    calcTurn();
    nextTurn();
  }

  runTurns () {
    setTimeout( () => {
      this.cycleTurn();
      this.runTurns();
    }, 500 );
  }

  changeNums(evt){
    evt.preventDefault();
    switch(evt.target.name){
      case 'minLess'  : MIN_LIVING_NEIGHBORS--; break;
      case 'minMore'  : MIN_LIVING_NEIGHBORS++; break;
      case 'maxLess'  : MAX_LIVING_NEIGHBORS--; break;
      case 'maxMore'  : MAX_LIVING_NEIGHBORS++; break;
      case 'birthLess': LIVING_NEIGHBORS_TO_BIRTH--; break;
      case 'birthMore': LIVING_NEIGHBORS_TO_BIRTH++; break;
    }
    this.setState({
    });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    BOARD_SIZE--;
    init();
    animate();
    this.setState({drawnBoard: true});
  }

  render() {
    return (
      <Sidebar 
        drawnBoard={this.state.drawnBoard}
        boardSize={BOARD_SIZE}
        handleSubmit={this.handleSubmit} 
        cycleTurn={this.cycleTurn}
        lifePercent={SEED_LIFE_RATIO}
        minLive={MIN_LIVING_NEIGHBORS}
        maxLive={MAX_LIVING_NEIGHBORS}
        numberBirth={LIVING_NEIGHBORS_TO_BIRTH} 
        handleBoardSize={this.handleBoardSize}
        changeNums={this.changeNums}
        handleLifeRatio={this.handleLifeRatio}
        runTurns={this.runTurns}
      />
    );
  }
  
}
