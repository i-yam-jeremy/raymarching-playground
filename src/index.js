import React from 'react';
import ReactDOM from 'react-dom';
import NodeEditorPanel from './components/node/node-editor-panel.jsx';

import './stylesheets/node.sass'

ReactDOM.render(
  <div style={{overflow: 'hidden'}}>
    <div className="main-panel-container">
      <NodeEditorPanel />
    </div>
    <div className="main-panel-container" style={{float: 'right', right: '0px', backgroundColor: 'green'}}>
    </div>
  </div>
  , document.body);
