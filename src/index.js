let template = require('./template.hbs')

data = {name: 'Jeremy'}

let result = template(data)

let domElement = document.createElement('div');
domElement.innerHTML = result;

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(domElement);
})
