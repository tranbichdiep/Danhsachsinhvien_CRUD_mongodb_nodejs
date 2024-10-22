// Filename - Server.js

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

// const port = 8001;
const app = express();

const port = process.env.PORT || 5000; // Đổi cổng sang 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.use('/api', api);
