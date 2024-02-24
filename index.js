const express = require("express");
const { rembg } = require('@remove-background-ai/rembg.js');
const dotenv = require('dotenv');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/api/users"));

// Load environment variables from .env file
dotenv.config();

// API_KEY will be loaded from the .env file
const API_KEY = process.env.API_KEY;

// log upload and download progress
const onDownloadProgress = console.log;
const onUploadProgress = console.log;
rembg({
    apiKey: API_KEY,
    inputImagePath: './pic.png',
    onDownloadProgress,
    onUploadProgress
}).then(({ outputImagePath, cleanup }) => {
    console.log('✅🎉 background removed and saved under path=', outputImagePath);
    // if called, it will cleanup (remove from disk) your removed background image
    // cleanup();
});
		

app.listen(3000, () => console.log('Server started'));