const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitizer = require('express-mongo-sanitize');
const xss = require('xss-clean');

dotenv.config();

const app = express();
//set security HTTP headers
app.use(helmet());

//limit requests from same IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:'Too many request from this IP, please try again in an hour'
});

app.use('/api', limiter);



app.use(morgan('dev'));

//body parser,reading data from body into req.body
app.use(express.json({limit:'10kb'}));

//Data sanitization against NoSQL query injection
app.use(mongoSanitizer());
//Data sanitization against XSS
app.use(xss());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.headers);

    next();
});

app.use('/api/', router);

const port = process.env.PORT || 3000;

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
