// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import routers
const indexRouter = require('./routes/index');
const commentRouter = require('./routes/comment');

// Create web server
const app = express();

// Set view engine
app.set('view engine', 'pug');

// Set middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// Set routers
app.use('/', indexRouter);
app.use('/comment', commentRouter);

// Set static files
app.use(express.static('public'));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = app.get('env') === 'developement' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export app
module.exports = app;