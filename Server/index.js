const express = require('express');
const app = express();
const homeRouter = require('./routes').homeRouter;

app.use('/', homeRouter);

app.listen(3000, () => console.log('Listen: 3000'));
