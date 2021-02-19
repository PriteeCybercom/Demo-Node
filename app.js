const express=require('express');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/user')
const app=express();


app.use(bodyParser.json());

app.use('/',userRoutes);
//Homepage
app.get('/',(req,res)=>{
    res.status(200).json({
        status:1,
        message:"Homepage"
    })
})

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})