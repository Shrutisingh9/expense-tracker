const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Change this in production
    credentials: true
}));

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// Global error handler (Prevents app from crashing on unexpected errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    });
};

server();