const express = require('express');
const app = express();
const PORT = 3000;

const urlRoute = require('./routes/url')
const connectToMongoDB = require('./connect');

app.use('/url', urlRoute);

app.listen(PORT, () => console.log(`Server running at port ${PORT}...`))
