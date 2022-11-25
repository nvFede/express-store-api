const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  errorHandler,
  logError,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
app.use(express.json());

const whitelist = ['domainList'];
const options = {
  origin: (origin, options) => {
    if (whitelist.includes(origin)) {
      options(null, true);
    } else {
      options(new Error('Invalid whitelist'));
    }
  },
};
// app.use(cors(options));
app.use(cors());

const port = 3001 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('App listening in port: ' + port);
});
