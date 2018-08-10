const fs = require('fs');
var filePath = '/Volumes/Scans/Temp';
var year = ' 2017';
var folders = fs.readdirSync(filePath);
console.log(folders);
//folders.forEach(function(folder){
  var files = fs.readdirSync(filePath/* + '/' + folder*/);
  //console.log(folder);
  console.log(files);
  files.forEach(function(file){
    // indexOf (file.indexOf('.PD') >= 0 && file.indexOf('.PDF') < 0) {
    //   var newFileName = file;
    //   console.log(newFileName);
    //   fs.renameSync(filePath + '/' + folder + '/' + file, filePath + '/' + folder + '/' + newFileName);
    // });
    fs.renameSync(filePath + '/'/* + folder + '/'*/ + file, filePath + '/'/* + folder + '/'*/ + file.toUpperCase());
    console.log(file);
    // if (file.indexOf('15') < 0 && file.indexOf('14') < 0) {
    //   var newFileName = file.slice(0, file.indexOf('.PDF')) + year + file.slice(file.indexOf('.PDF'));
    //   console.log(newFileName);
    //   fs.renameSync(filePath + '/' + folder + '/' + file, filePath + '/' + folder + '/' + newFileName.toUpperCase());
    // }
    //   fs.renameSync(filePath + '/' + folder + '/' + file, filePath + '/' + folder + '/' + file.toUpperCase());
    // fs.renameSync(filePath + '/' + folder + '/' + file, filePath + '/' + folder + '/' + newFileName);
  });
  //var files = fs.readdirSync(filePath + '/' + folder);
  console.log(files);
//});

// var txt2 = files[0].slice(0, files[0].indexOf('.PDF')) + " 2016" + files[0].slice(files[0].indexOf('.PDF'));
// fs.renameSync(filePath + '/' + folders[0] + '/' + files[0], filePath + '/' + folders[0] + '/' + txt2.toUpperCase());
// var files = fs.readdirSync(filePath + '/' + folders[0]);
// console.log(files);
// // folders.forEach(function(folder){
//   fs.renameSync(filePath + '/' + , filePath + );
// });



// fs.rename('/tmp/hello', '/tmp/world', (err) => {
//   if (err) throw err;
//   console.log('renamed complete');
// });
// fs.stat('/tmp/world', (err, stats) => {
//   if (err) throw err;
//   console.log(`stats: ${JSON.stringify(stats)}`);
// });
