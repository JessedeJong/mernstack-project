const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// Database config
const db = require('./config/keys').mongoURI;

//Connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('[database] connection established'))
    .catch(err => console.log(err)); // Catch the error 

//Use routes
app.use('/api/items', items);

// Serve static assets if production is enabled
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`[server] running on port ${port}`));