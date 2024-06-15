require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const Router=express.Router()
const xss=require('xss-clean')
const helmet=require('helmet');
const ratelimiter=require('express-rate-limit')
const cors=require('cors');
const swaggerui=require('swagger-ui-express');
const yamljs=require('yamljs');
const swaggedocument=yamljs.load('./swagger.yaml');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticationmiddleware=require('./middleware/authentication')
app.use(express.json());
app.use(xss())
app.use(helmet())
app.use(cors())
app.set('trust proxy',1)
// app.use(ratelimiter({windowMs: 15 * 60 * 1000, 
// 	limit: 100, }))
const {routerauth,router}=require('./routes');
const connectDB = require('./db/connect');
app.get('/',(req,res)=>{
  res.send('<h1>Documentation</h1><a href="/api">doc</a>')
})
app.use('/apidocs',swaggerui.serve,swaggerui.setup(swaggedocument));
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
