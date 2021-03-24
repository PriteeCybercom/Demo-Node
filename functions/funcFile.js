module.exports = {
    func1:  (req,res)=>{
        res.json({
            status: 1,
            data: "Function 1"
        })
    },
    func2:  (params)=>{
        console.log("hii "+params)
        return "hii "+params
    }
}