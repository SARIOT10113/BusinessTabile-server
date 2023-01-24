const express = require('express');
const app = express();
const dotenv = require('dotenv');
require('./db/conn');
dotenv.config({path:'./config.env'});

// SECURITY MIDDLEWARE
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const xssClean = require('xss-clean');
const expressMongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const router = require('./Routers/ProductRouter');

//security middleware implement
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(xssClean());
app.use(expressMongoSanitize());
app.use(helmet());
app.use(hpp());

// request rate limiting 
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.use("/api/v1",router)

module.exports = app ;