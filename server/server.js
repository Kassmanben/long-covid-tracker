const express = require('express');
const routes = require('./routes/routes.js');
const app = express();
const morgan = require('morgan')
const cors = require('cors');

app.use(cors());
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello, World'))
app.post('/newdata', routes.new_data)
app.get('/getdata', routes.get_data)


const port = process.env.PORT || '8080';
app.listen(port, () => {
  console.log('Server running on port ' + port + '. Now open http://localhost:' + port + '/ in your browser!');
});