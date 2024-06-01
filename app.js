const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/routes');

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/', router);

const port = process.env.PORT || 3000;

const getAllTours = (req, res) => {
    res.status(200).json({ data: { tours } });
};

app.get('/api/tours', getAllTours);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((error) => {
        console.log(error);
    });
