const jwtConfig = require('../../../config/jwtConfig')
const JWT = require('jsonwebtoken')

module.exports ={
    checkToken: (req,res,next) => {
        console.log("It's middleware")
        next()
    },
    token: (req,res,next) => {
        console.log("It's middleware 2")
        next()
    }
}














// const checkToken = (req,res,next) => {
//     console.log("It's middleware")
//     next()
// }

// module.exports.checkToken = checkToken