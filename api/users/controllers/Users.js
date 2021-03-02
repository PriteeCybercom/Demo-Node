const users = require('../../../db/models').User

module.exports = {
    findAll: async (req, res) => {
        users.findAll().then(data=> {
            res.status(200).json({
                status: 1,
                data: data
            })
        })
    },
    insert: async (req, res) => {
        
        users.create({
            name: "heer",
            email: "h@gmail.com",
        }).then(data=> {
            res.status(200).json({
                status: 1,
                message: "User inserted successfully...",
                data: data
            })
        }).catch(err=>{
            res.status(500).json({
                status: 0,
                data: err
            })
        })
    }
}