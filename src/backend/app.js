const express = require('express');
const path = require('path');
const server = require('./server');
const bodyParser = require('body-parser');

const app = express();

app.set('port', 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const main = () => {
  server(app)
  app.listen(3001, () => console.info('Express: listening on 3001'))
}

main();
