module.exports = (err, req, res, next) => {
    err.StatusCode = err.StatusCode || 500;
    err.status = err.status || 'error';

    res.status(err.StatusCode).json({
        status: err.status,
        message: err.message 
    })
    next()
   
}