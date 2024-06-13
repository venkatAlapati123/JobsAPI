require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const Router=express.Router()
const xss=require('xss-clean')
const helmet=require('helmet');
const ratelimiter=require('express-rate-limit')
const cors=require('cors');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticationmiddleware=require('./middleware/authentication')
app.use(express.json());
app.use(xss())
app.use(helmet())
app.use(cors())
app.set('trust proxy',1)
app.use(ratelimiter({windowMs: 15 * 60 * 1000, 
	limit: 100, }))
// extra packages
const {routerauth,router}=require('./routes');
const connectDB = require('./db/connect');
// routes
app.use('/api/v1',routerauth,authenticationmiddleware,router);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
