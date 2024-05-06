import express, {Express , Request , Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import './src/services/db.service';
import dotenv from 'dotenv';
// dotenv.config();
import { env } from 'node:process'
const app: Express = express()
const PORT = process.env.PORT || 3000
const DATABASE_URL = env.TZ

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}+${DATABASE_URL}`)
  })