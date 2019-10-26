var fs = require("fs");
var zlib = require('zlib');

fs.createReadStream('public/bundle.js').pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('public/bundle.js.gz'));
  console.log("File Compressed.");
