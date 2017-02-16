import React, {Component} from 'react';

import {SidebarContainer} from '../containers/SidebarContainer.jsx';

export class View extends Component {

  render () {
    return (
      <div className="fluid-container">
        <SidebarContainer className="col-xs-12" />
        <div id="game" className="col-xs-12">
        </div>
      </div>
    ); 
  }

}