const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const rootDir = require('/util/path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// for parsing input from form setting extended to false avoids errors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

// '/' is default so not required
app.use('/', (req, res, next) => {
  //for prior use of html instead of template engine
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render('404', { pageTitle: 'Page Not Found', layout: false });
});

app.listen(3000);
