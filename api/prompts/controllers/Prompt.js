const prompts = require('prompts');

module.exports = {
    welcome: (req,res) => {
        res.status(200).json({
            status: 1,
            message: "Welcome"
        })
    },
    
    confirm: async (req,res)=>{
        // const response = await prompts({
        //     type: 'number',
        //     name: 'value',
        //     message: 'How old are you?',
        //     validate: value => value < 18 ? `Nightclub is 18+ only` : true
        // }); 
        // console.log(response); // => { value: 24 }
        res.json({
            status:1
        })
    }
}