/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const {
    MORGAN_FORMAT, NODE_ENV, SERVE_STATIC, PORT
} = process.env;
const express = require('express');
const path = require('path');

const app = express();
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info'
});

app.use(require('morgan')(MORGAN_FORMAT));
app.use(require('compression')());

app.use(express.static(path.join(__dirname, SERVE_STATIC)));

if (NODE_ENV === 'development') {
    const config = require('./webpack.config');
    const compiler = require('webpack')(config);
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.listen(
    PORT,
    () => logger.info(`Server started at port ${PORT}`)
);
