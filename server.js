// 1. Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
});
require('dotenv').config();

// 2. Import Models
const signup = require('./models/signup');
const Sale = require('./models/sale');

// 3. App Initialization
const app = express();
const PORT = 3000;

// 4. Import Routes
const saleRoutes = require('./routes/saleRoutes');
const authRoutes = require('./routes/authRoutes');
const produceRoutes = require('./routes/produceRoutes');
const managerRoutes = require('./routes/managerRoutes');
const salesAgentRoutes = require('./routes/salesAgentRoutes');
const creditSalesRoutes = require('./routes/creditSaleRoutes');
const directorRoutes = require('./routes/directorRoutes');

// 5. Database Configuration
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .on('open', () => console.log('Mongoose connection open'))
  .on('error', (err) => console.log(`Connection error: ${err.message}`));

// 6. App Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.moment = moment;

// 7. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/img'))); // Static path for produce images

app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.use(signup.createStrategy());
passport.serializeUser(signup.serializeUser());
passport.deserializeUser(signup.deserializeUser());

// 8. Route Middleware
app.use('/', authRoutes);
app.use('/sales', saleRoutes);
app.use('/sales', creditSalesRoutes);
app.use('/', produceRoutes);
app.use('/', managerRoutes);
app.use('/', salesAgentRoutes);
app.use('/director', directorRoutes);

// 9. Default Route
app.get('/', (req, res) => {
  res.render('home');
});

// 10. 404 Fallback
app.use((req, res) => {
  res.status(404).send('Oops! Page not found.');
});

// 11. Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
