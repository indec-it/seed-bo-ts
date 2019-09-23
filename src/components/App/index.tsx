import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Main from './Main';

const App = (): React.ReactNode => (
    <HashRouter>
        <Main/>
    </HashRouter>
);

export default hot(App);
