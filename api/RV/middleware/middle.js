module.exports = {
    errorHandler: ( err,req, res, next) => {
        console.log("in middle 2")
        console.error("stack ",err.stack)
        res.status(500).send('Something broke!')
        // next()
        // if (res.headersSent) {
        //     return next(err)
        // }
        // res.status(500)
        // res.render('error', { error: err })
    },
    error: (req, res, next) => {
        console.log("in middle")
        const url = res.locals.url;
        res.locals.urlll = req.url
        const err = res.locals.err;
        console.log("uurrll ",res.locals);
        next();
    }
}