require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
const router  = require('./routes/Router.js');
app.use(router);

// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//Uploads directorys
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


//DB connection
require('./config/db.js');


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
