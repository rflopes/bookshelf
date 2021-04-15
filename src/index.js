import { loadDevTools } from './dev-tools/load';
import 'test/server/dev-server';
import './bootstrap';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

loadDevTools(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
