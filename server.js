const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./app/helpers/auth');

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

try{
  app.use(auth);//middleware application firewall for the api
}catch{
  return res.status(401).json({ message: 'Auth failure' });
}

/* Routes */
const routes = require('./app/routes');
routes(app); //register the route