const jwtConfig = require('./jwtConfig')
const JWT = require('jsonwebtoken')

const checkToken = (req,res,next) =>{
    let userToken = req.headers["authorization"]
    if(userToken){
        JWT.verify(userToken,jwtConfig.secret,(error,decoded)=>{
            if(error){
                return res.status(500).json({
                    status: 0,
                    message: "Token is invalid",
                    data: error
                })
            } else {
                req.user = decoded
                next()
                // res.status(200).json({
                //     status: 0,
                //     message: "Token is valid",
                //     data: decoded
                // })
            }
        })
    } else {
        return res.status(500).json({
            status: 0,
            message: "Please Provide Authentication"
        })
    }
}

module.exports.checkToken = checkToken