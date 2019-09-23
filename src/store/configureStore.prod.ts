import { createStore, applyMiddleware } from 'redux';
import saga from 'redux-saga';

import loadAsyncState from './loadAsyncState';
import reducers from '~reducers/index';
import sagas from '~sagas/index';

const sagaMiddleware = saga();

export default function configureStore(initialState?): void {
    const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);

    return loadAsyncState(store);
}
