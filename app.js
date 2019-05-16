const express = require('express');
const logger = require('./util/logger');
const path = require('./util/path');
const connection = require('./database/db');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// app.use('/user', userRoutes);
app.use('/pet', petRoutes);


app.use((req,res,next) => {
    res.status(404).send('Page not found');
});

module.exports = app;