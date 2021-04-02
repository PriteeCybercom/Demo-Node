var cron = require('node-cron');

module.exports = {
  // task : cron.schedule('* * * * * *', () => {
  //     console.log('running a task2 every second');
  //   }),
  task2: cron.schedule('* * * * *',()=>{
    console.log('running a task2 every minute...')
  })
}

