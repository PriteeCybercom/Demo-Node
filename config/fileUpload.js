const multer = require('multer')
const fs = require('fs')
const path = require('path')
var dest = path.join(__dirname,'..','uploads')
var store =  (dest) => {
  var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      },
      destination: function (req, file, cb) { 
        let dir = dest//__dirname+'/../uploads/';
        if(!fs.existsSync(dir)){
          fs.mkdirSync(dir)
        }
        cb(null,dir);
      }
  })
  var upload = multer({ storage: storage })
  setup.uploadFile = upload
}
store(dest)
setup.store = store
// const upload = multer({dest:'uploads/'});
// module.exports = upload