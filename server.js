const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Pour charger les variables d'environnement

// Configuration MongoDB (sans options dépréciées)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdb';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const app = express();

// Middlewares et configuration de l'application
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use('/api/data', require('./routes/new-index.js'));

// Catch-all pour React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.set('port', process.env.PORT || 5000);
// console.log("+++++++++++++++" + app.get('port'));

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static('./client/build'));

// app.use('/api/data', require('./routes/new-index.js'))

// app.get("*", (req, res) => { //our GET route needs to point to the index.html in our build
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     res.status(err.status || 5000);
//     res.render('error');
// });

// module.exports = app;

// app.listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + app.get('port'));
// });