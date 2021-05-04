const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://dbUser:dbPassword@cluster0.xle8x.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => { console.log("Connected using mongoose!") }, err => { console.log(err) });

const boardRouter = require('./routes/board');
const columnRouter = require('./routes/column');
const cardRouter = require('./routes/card');

app.use(bodyParser.json());
app.use('/board', boardRouter);
app.use('/column', columnRouter);
app.use('/card', cardRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});