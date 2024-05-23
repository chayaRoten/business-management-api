import express, { Express} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import './src/services/db.service';
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express()
const PORT = process.env.PORT


import businessRouter from './src/routes/business.route'
import meetingRouter from './src/routes/meeting.route'
import serviceRouter from './src/routes/services.route'
import userRouter from './src/routes/user.route'
import authenticateTokenMiddlewares  from './src/middlewares/authentication.middlewares'
import loggerMiddlewares from './src/middlewares/logger.middleware'
import setupSwagger from './src/routes/swagger';

setupSwagger(app);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(loggerMiddlewares)

app.use(userRouter);
app.use(authenticateTokenMiddlewares);
app.use(businessRouter);
app.use(meetingRouter);
app.use(serviceRouter);




app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})