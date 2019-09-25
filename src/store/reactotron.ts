'use-strict';

import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import * as sagasPlugin from 'reactotron-redux-saga';

declare const NAME: string;

const reactotron = Reactotron
    .configure({ name: NAME })
    .use(reactotronRedux())
    .use(sagasPlugin())
    .connect();
const reactotronEnhancer = reactotron.createEnhancer();
const sagaMonitor = reactotron.createSagaMonitor();
// eslint-disable-next-line no-console
console.log = Reactotron.log;
export { reactotronEnhancer };
export { sagaMonitor };
export default reactotron;
