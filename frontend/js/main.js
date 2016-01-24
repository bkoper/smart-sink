import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import '../static/scss/style.scss';
import liveSocketApi from './api/live-sockets';

ReactDom.render(<App />, document.querySelector("#main"));
