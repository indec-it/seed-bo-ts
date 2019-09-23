import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '~components/Home';
import Logs from '~components/Logs';

const Routes = (): React.ReactNode => (
    <main>
        <Switch>
            <Route path="/logs" component={Logs}/>
            <Route component={Home}/>
        </Switch>
    </main>
);

export default Routes;
