const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', apiRouter);

app.listen(port, () => {
  console.log('We are live on port '+port);
});