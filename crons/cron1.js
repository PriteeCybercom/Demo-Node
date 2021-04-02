var cron = require('node-cron');

module.exports = {
  // task : cron.schedule('* * * * * *', () => {
  //     console.log('running a task every second');
  //   },{
  //     scheduled: false,
  //   }),
  task2: cron.schedule('* * * * *',()=>{
    console.log('running a task every minute...')
  },{
    scheduled: false,
  })
}

