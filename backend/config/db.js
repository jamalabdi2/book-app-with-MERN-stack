const mongoose = require('mongoose');

async function connectDB(){
    const mongouri = process.env.MONGOURI;
    try{
        const conn = await mongoose.connect(mongouri);
        console.log('connected to the database');
    }catch(dbConnectionError){
        console.log('error occured while connecting to a database');
        console.log(dbConnectionError);
        process.exit();
    }
    
    
}

module.exports = connectDB

