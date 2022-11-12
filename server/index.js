import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import connection from './db.js';
import Router from './routes/route.js';
import bodyParser from 'body-parser'
dotenv.config();
connection();
const app=express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use('/',Router)
const port=8080;
app.listen(port,()=>console.log(`Listening on port${port}`));

 
