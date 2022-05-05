const fs = require('fs')

const getfiles = (path, ending) => {
    return fs.readdirSync(path).filter(f=> f.endsWith(ending))
}

module.exports = {
    getfiles
}