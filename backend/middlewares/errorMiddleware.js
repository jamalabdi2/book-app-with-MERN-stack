

const errorMiddleware = (err,req,res,next) =>{
    const  statusCode = res.statusCode
    const message = "error occured";
    console.log(message);
    console.log(statusCode);
    res.status(statusCode);
    res.json({
        message:err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    })
    next();
}

module.exports = errorMiddleware;