// Packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const uuid = require('node-uuid')

// Get item api
const items = require('./routes/api/items')
const app = express()

// Request logging
// File rotation for logs
const logStream = rfs('access.log', {
    interval: '1d', // Create a new log for every day
    path: path.join(__dirname, 'log')
})

// Create an ID token to be used in the logs
morgan.token('id', function createId (req) {
    return req.id;
})

// Assign a random ID to the token
function assignTokenId (req, res, next) {
    req.id = uuid.v4()
    next()
}
app.use(assignTokenId)

// Create the log entry layout
app.use(morgan(':method :date :id :url :response-time :remote-addr :status' , {
    stream: logStream
}))

// Apply bodyparser middleware
app.use(bodyParser.json())

// Configure database connection
const db = require('./config/keys').mongoURI;

// Connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('[database] connection established'))
    .catch(err => console.log(err)); // Catch the error 

// Add item routes
app.use('/api/items', items)

// Serve static files when in production
if (process.env.NODE_ENV === 'production') {
    // Point to folder
    app.use(express.static('client/build'));
    
    // Get files
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Listen on port specified in env or 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`[server] running on port ${port}`));