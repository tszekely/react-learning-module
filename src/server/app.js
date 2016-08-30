require('babel-register')({
  presets: ['es2015', 'react']
});

const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  url = require('url'),
  express = require('express'),
  favicon = require('serve-favicon'),
  engine = require('react-engine'),
  env = process.env,
  routes = require('../client/app/routes.jsx'),
  getProducts = require('../client/app/actions/view/ProductActions').getProducts,
  getProductById = require('../client/app/actions/view/ProductActions').getProductById;

let app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));

app.engine('.jsx', engine.server.create({
  routes: routes,
  routesFilePath: path.resolve(__dirname, '../client/app/routes.jsx'),
  scriptLocation: 'head'
}));

app.set('views', path.resolve(__dirname, '../client/app/components'));

app.set('view engine', 'jsx');

app.set('view', engine.expressView);

app.use(express.static(path.join(__dirname, '/public'), {
  index: false
}));

app.get('/shop/:id', (req, res) => {
  const r = getProductById(req.params.id);

  r.then((response) => {
    res.render(req.url, {
      productById: response
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.get('/shop', (req, res) => {
  const page = req.query.page || 1;

  const r = getProducts(page, 24);

  r.then((response) => {
    res.render(req.url, {
      products: response
    });
  }).catch((err) => {
    console.log(err);
  });
});

app.get('*', (req, res) => {
  res.render(req.url, {});
});

app.listen(env.NODE_PORT || 8080, env.NODE_IP || 'localhost', () => {
  console.log(`Application worker ${process.pid} started...`);
});