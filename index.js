require('dotenv').config();
const app = require('./server/server');
const environment = require('./environment');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} in ${environment} environment`);
});
