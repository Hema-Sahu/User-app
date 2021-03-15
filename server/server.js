require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
const user = require('./routes/user');
const fileRoutes = require("./routes/file-upload");
const cors = require('cors')

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors())
app.use('/api/users', user);
app.use('/api/upload',fileRoutes);

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
