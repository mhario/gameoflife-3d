import React, {Component} from 'react';

import {SidebarContainer} from '../containers/SidebarContainer.jsx';

export class View extends Component {

  render () {
    return (
      <div className="fluid-container">
        <div id="game" className="col-md-9">
        </div>
        <SidebarContainer />
      </div>
    ); 
  }

}