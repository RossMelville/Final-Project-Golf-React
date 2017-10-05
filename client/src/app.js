import React from 'react';
import ReactDOM from 'react-dom';
import GolfContainer from './containers/GolfContainer.jsx'


window.addEventListener('load', function () {
  ReactDOM.render(
    <GolfContainer />,
    document.getElementById('app')
  );
});
