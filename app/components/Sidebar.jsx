import React from 'react';

export const Sidebar = props => (
  <div>
    {
      (props.drawnBoard == false)
      ?
      <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12 menu main-menu">
        <form onSubmit={props.handleSubmit}>
          <h2>Game of Life</h2>
          <div className="row">
            <div className="col-xs-5 label"><p> Board Size:</p></div>
            <div className="col-xs-7"><input id="boardSize" type="range" className="sliderBar" value={props.boardSize} min="5" max="25" onChange={props.handleBoardSize}/></div>
          </div>
          <div className="row">
            <div className="col-xs-5 label"><p> Seed life percentage: </p></div>
            <div className="col-xs-7"><input id="lifePercent" type="range" className="sliderBar" value={props.lifePercent} min="0" max="1" step=".05" onChange={props.handleLifeRatio}/></div>
          </div>
          <br />
          <hr />
          <h4>Living Neighbor Rules</h4>
          <div className="col-xs-3 col-xs-offset-2 label buttonLabel"><strong> Minimum: </strong></div>
          <div className="col-xs-7"><button className="btn bracket-button" onClick={props.changeNums} name="minLess">&lt;</button><p>{props.minLive}</p>
            <button className="btn bracket-button" onClick={props.changeNums} name="minMore">&gt;</button><br /></div>
          <div className="col-xs-3 col-xs-offset-2 label buttonLabel"><strong> Maximum: </strong></div>
          <div className="col-xs-7"><button className="btn bracket-button" onClick={props.changeNums} name="maxLess">&lt;</button><p>{props.maxLive}</p>
            <button className="btn bracket-button" onClick={props.changeNums} name="maxMore">&gt;</button><br /></div>
          <div className="col-xs-3 col-xs-offset-2 label buttonLabel"><strong> Birth: </strong></div>
          <div className="col-xs-7"><button className="btn bracket-button" onClick={props.changeNums} name="birthLess">&lt;</button><p>{props.numberBirth}</p>
            <button className="btn bracket-button" onClick={props.changeNums} name="birthMore">&gt;</button><br /></div>
          <button type="submit" className="btn btn-primary">Build it!</button>
        </form>
      </div>
      :
      <div className="col-xs-12 menu">
        <div className="col-xs-4 text-center">
        <button
          className="btn-primary btn"
          onClick={() => props.cycleTurn()}>Single Turn</button>
        </div>
        <div className="col-xs-4 text-center">
          <button
            className="btn-primary btn"
            onClick={() => props.runTurns()}>Play in Auto
          </button>
        </div>
        <div className="col-xs-4 text-center">
          <form>
            <button type="submit" className="btn">Reset</button>
          </form>
        </div>
      </div>
    }
  </div>
);
