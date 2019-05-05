import React from 'react';
import ReactDOM from 'react-dom';
import Node from './components/node.jsx';

ReactDOM.render(<Node title="Sphere" inputs={['radius', 'center']} />, document.body);
