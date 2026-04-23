const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Backend/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '_' + Math.floor(Math.random() * 9999+1000) + path.extname(file.originalname)
    cb(null,  file.fieldname + "_" + uniqueName)
  }
})

const upload = multer({ storage: storage })

module.exports = upload