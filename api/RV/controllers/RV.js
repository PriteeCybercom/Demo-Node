'use strict';

// const funn = setup.functions["funcFile"]["func1"]
const studentModel = require('../../../db/models').students
const Op = require('sequelize').Op
const multer = require('multer')

module.exports = {
    welcome: (req,res) => {
        var params = "Hiral"
        res.status(200).json({
            status: 1,
            message: "Welcome",
            data: setup.functions["funcFile"]["func2"](params),
            service: setup.services["RV"]["serve"]["service1"](params)
        })
    },
    globall: setup.functions["funcFile"]["func1"],
    getData: (req,res,next) => {
        setup.crons["cron1"]["task"].start()
        /*  #swagger.tags = ['students']
            #swagger.description = 'Endpoint to get the specific user.' */
        studentModel.findAll({
            where: {
                // email: {
                //     [Op.eq]: req.body.email
                // }
                id: {
                    [Op.eq] : req.params.id
                }
            }
        }).then(data=>{
            if(data){
                res.json({
                    data: data
                })
            } else {
                next()
            }
        })
    }, 
    insert: (req,res,next)=>{
        // #swagger.tags = ['students']
        studentModel.create({
            name: req.body.name,
            email: req.body.email
        }).then(user=>{
            // res.status(500).send('Something broke')
            res.status(200).json({
                status: 1,
                message: "Student created successfully"
            })
        }).catch(e=>{
            const err = new Error(e.name+" : "+setup.findErr(e.errors,'message'))
            err.status = 500
            next(err)
            // res.json({
            //     e: e
            // })
        })
    }, 
    upload: (req,res,next) => {
        setup.store(__dirname+'/../')
        setup.uploadFile.fields([{name: 'image',maxCount: 1}]) (req,res,(err)=>{
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.files) {
                return res.send('Please select a file to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
        console.log("filee",req.files);
        res.status(200).json({
            status: 1,
            files: req.files.image[0]["originalname"]+" file is saved as "+req.files.image[0]["filename"]+" at "+req.files.image[0]["destination"]
        })
    })
    }
}