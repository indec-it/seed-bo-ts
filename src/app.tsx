/* global document */
import * as React from 'react';
import { render } from 'react-dom';

import App from '~components/App/index';

import Root from './containers/Root';
import configureStore from './store';
import './sass/app.scss';

const store = configureStore();

render(
    <Root store={store} comp={App}/>,
    document.getElementsByTagName('article')[0]
);
