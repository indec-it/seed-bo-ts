import * as React from 'react';
import {Provider} from 'react-redux';

const Root = ({store, comp: Comp}) => (
    <Provider store={store}>
        <Comp/>
    </Provider>
);

export default Root;
