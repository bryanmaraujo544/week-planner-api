require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());    
app.use(routes);
app.use((err, req, res, next) => {
    if (err) {
        console.log('err intercepted by error handler', err);
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running in the port 5000'));