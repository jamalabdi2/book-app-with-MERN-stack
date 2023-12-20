const express = require('express');
const router = require('./routes/routes')
const connectDB = require('./config/db');

require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/bookapi/v1',router);



//open a dictionary with one for destinationa and filename
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})