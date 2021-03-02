module.exports = {
    middle: (req,res,next) => {
        console.log("global middleware")
        next()
    }
}