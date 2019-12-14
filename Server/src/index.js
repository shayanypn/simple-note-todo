const express = require('express');
const bodyParser = require('body-parser');
// load mongoose package
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/todo-api', {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors({
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type',
                    'Accept', 'X-Access-Token', 'Authorization'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false
}));
app.use('/', router);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.listen(3000, () => console.log('Listen: 3000'));
