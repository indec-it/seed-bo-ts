import { createStore, applyMiddleware, compose } from 'redux';
import saga from 'redux-saga';
import sagas from '~sagas/index';
import loadAsyncState from './loadAsyncState';
import reducers from '~reducers/index';

const composeEnhancers = compose;

const sagaMiddleware = saga();

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);

export default function configureStore(initialState): void {
    const store = createStore(reducers, initialState, enhancer);
    sagaMiddleware.run(sagas);

    /* if (module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(reducers));
        module.hot.accept('../sagas', () => {
            sagaTask.cancel();
            sagaTask.done.then(() => {
                sagaTask = sagaMiddleware.run(sagas);
            });
        });
    } */

    return loadAsyncState(store);
}
