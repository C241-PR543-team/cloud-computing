import express from 'express';
import router from './src/routes/routes.js';
import db from './src/database/config.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware to parse JSON bodies in requests
app.use(express.json());

app.use(cookieParser());

// Use the imported router for handling routes
app.use(router); 

// Define an async function to handle the asynchronous operations
const startServer = async () => { 
    try {
        // Attempt to authenticate the database connection
        await db.authenticate(); 
        console.log('Connection has been established successfully.');
    } catch (error) {
        // Log an error message if the database connection fails
        console.error('Unable to connect to the database:', error);
    }

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server berjalan pada ${port}`);
    });
};

// Call the async function to start the server
startServer();