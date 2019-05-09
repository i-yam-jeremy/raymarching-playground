import React from 'react';
import ReactDOM from 'react-dom';
import Node from './components/node/node.jsx';

ReactDOM.render(
  <div>
    <Node title="Sphere" inputs={['radius', 'center', 'input1', 'input2', 'input3']} />
    <Node title="Sphere" inputs={['radius', 'center']} />
  </div>
  , document.body);
