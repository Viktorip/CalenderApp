import React from 'react';
import ReactDOM from 'react-dom';

import {Main} from './app.main';


window.onload = function(){
    ReactDOM.render(<Main />, document.getElementById('appcontent'));
}