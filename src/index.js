import React from 'react';
import ReactDOM from 'react-dom';
import Node from './components/node.jsx';

ReactDOM.render(
  <div>
    <Node title="Sphere" inputs={['radius', 'center']} />
    <Node title="Sphere" inputs={['radius', 'center']} />
  </div>
  , document.body);
