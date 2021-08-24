import './public-path'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { defaultConfig } from '@tikivn/sc-frontend-common'

const history = createBrowserHistory({
  basename: window.__POWERED_BY_QIANKUN__ ? '#/poc' : '/',
})

defaultConfig({
  env: {
    API_ACP: process.env.REACT_APP_API_ACP,
    API_SC: process.env.REACT_APP_API_SC,
  }
})

const render = (props) => {
  const { container } = props;

  ReactDOM.render(    <React.StrictMode>
    <Router history={history}>
      {/* <App {...props} /> */}
      <Route path="/a">aaaaaaaaaaaa</Route>
      <Route path="/b">bbbbbbbbbbb</Route>
    </Router>
  </React.StrictMode>, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('micro app - bootstraped');
}

export async function mount(props) {
  console.log('micro aop - mounted', props);

  render(props);
}

export async function unmount(props) {
  console.log('micro app - unmounted', props);

  const { container } = props;

  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector('#root') : document.querySelector('#root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
