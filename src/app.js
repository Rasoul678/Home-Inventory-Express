const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const middlewares = require('./middlewares');
const project = require('./constants/project');
const api = require('./api');
require('./libs/init_redis');

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json()); // For json request like axios.
app.use(express.urlencoded({extended: true})); // For requests come from forms.
app.use(express.static('public'));


app.get('/', (req, res)=>{
    res.json({
        message:  project.message
    });
});

app.use('/api/v1', api)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;