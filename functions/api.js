const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/recipeRoutes'); // Change to recipeRoutes
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const dbCloudUrl = 'mongodb+srv://jornadaljarnalsin:C9991CA4DCC3@cluster0.rvkhrov.mongodb.net/JornadalDB';

const dbLocalUrl = 'mongodb://localhost:27017/recipe-db'; // Change to your recipe database name

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(dbCloudUrl || dbLocalUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
