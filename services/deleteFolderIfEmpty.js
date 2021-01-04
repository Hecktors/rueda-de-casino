const fs = require("fs")

function deleteFolderIfEmpty(dir) {
  fs.readdir(dir, (err, files) =>{
    if(err){
      console.log(err)
    } else {
      !files.length && fs.rmdirSync(dir)
    }
  })
}

module.exports = deleteFolderIfEmpty
