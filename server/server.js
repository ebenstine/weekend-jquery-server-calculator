const express = require('express');
let bodyParser = require('body-parser');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(port, () => {
  console.log('listening on port', port);
});
