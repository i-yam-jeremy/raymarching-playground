import React from 'react';
import ReactDOM from 'react-dom';
import Node from './components/node/node.jsx';
import SphereNodeContent from './components/node/node-contents/sphere.jsx'

ReactDOM.render(
  <div>
    <Node title="Sphere" inputs={SphereNodeContent.inputs} outputType={SphereNodeContent.outputType} nodeContent={SphereNodeContent} />
    <Node title="Sphere" inputs={SphereNodeContent.inputs} outputType={SphereNodeContent.outputType} nodeContent={SphereNodeContent} />
  </div>
  , document.body);
