const express = require('express');
const router = require('./routes/routes')
const connectDB = require('./config/db');
const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware');

require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use('/bookapi/v1',router);
app.use(errorMiddleware);



//open a dictionary with one for destinationa and filename
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})