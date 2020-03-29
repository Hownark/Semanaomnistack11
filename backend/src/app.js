const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate')
const routes = require('./routes');

const app = express();

app.use(cors()); //seguranca para determinar quem pode acessar app
app.use(express.json()); // usar json nas requisicoes
app.use(routes);
app.use(errors());

module.exports = app;