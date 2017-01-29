import React from 'react';

export const Sidebar = props => (
  <div className="side-bar col-md-3 form-group">
    <h2>Game of Life</h2>
    {
      (props.drawnBoard == false) 
      ?
      <form onSubmit={props.handleSubmit}>
        <p> Seed life percentage: </p><input name="lifePercent" value={props.lifePercent} onChange={props.handleLifeRatio}/><br />
        <p> Board Size: </p><input name="boardSize" value={props.boardSize} onChange={props.handleBoardSize}/><br />
        <hr />
        <h4>Living Neighbor Rules</h4>
        <div className="col-xs-3"><strong> Minimum: </strong></div>
        <div className="col-xs-9"><button className="btn bracket-button" onClick={props.changeNums} name="minLess">&lt;</button><p>{props.minLive}</p>
          <button className="btn bracket-button" onClick={props.changeNums} name="minMore">&gt;</button><br /></div>
        <div className="col-xs-3"><strong> Maximum: </strong></div>
        <div className="col-xs-9"><button className="btn bracket-button" onClick={props.changeNums} name="maxLess">&lt;</button><p>{props.maxLive}</p>
          <button className="btn bracket-button" onClick={props.changeNums} name="maxMore">&gt;</button><br /></div>
        <div className="col-xs-3"><strong> Birth: </strong></div>
        <div className="col-xs-9"><button className="btn bracket-button" onClick={props.changeNums} name="birthLess">&lt;</button><p>{props.numberBirth}</p>
          <button className="btn bracket-button" onClick={props.changeNums} name="birthMore">&gt;</button><br /></div>
        <button type="submit" className="btn btn-primary">Build it!</button>
      </form>
      :
      <div>
        <button 
          className="btn-primary btn"
          onClick={() => props.cycleTurn()}>Cycle Turn</button>
        <button 
          className="btn-primary btn"
          onClick={() => props.runTurns()}>Play</button>
        <form>
          <button type="submit" className="btn">Reset</button>
        </form>
      </div>  
    }
  </div>
);
