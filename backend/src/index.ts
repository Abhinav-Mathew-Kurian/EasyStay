import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import conectDB from './config/db';
import { connect } from 'http2';

const PORT = process.env.PORT;

conectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`The server running on ${PORT}`)
})
})

