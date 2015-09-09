var fs   = require('fs'),
    path = require('path');

if (!(process.env.SERVER || fs.existsSync(path.join(__dirname, 'local.js')))) {

    throw new Error('Debes crear un archivo de configuración local en ' + __dirname + ', copia el de prod y sustituye sus valores.');
}

module.exports = require('./' + (process.env.SERVER || 'local'));
