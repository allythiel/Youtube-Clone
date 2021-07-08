const express = require('express');
const cors = require('cors');
const connectDB = require('./startup/db');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});