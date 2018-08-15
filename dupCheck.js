const fs = require('fs');
const score = require('string-score');
const rl = require('readline-sync');
var sys = require('util');
var exec = require('child_process').exec;


function getCommandLine() {
  switch (process.platform) {
  case 'darwin' : return 'open';
  case 'win32' : return 'start';
  case 'win64' : return 'start';
  default : return 'xdg-open';
  }
}

var filePath = '/Volumes/Scans/TAX HISTORY';

var ssFolders = fs.readdirSync(filePath);
var numberOfFolders = 0;
var numberOfNames = 0;
var uniqueNames = {};
ssFolders.forEach(folder => {
  if (folder == '.DS_Store') return;
  var names = fs.readdirSync(filePath + '/' + folder);
  console.log(folder);
  numberOfFolders += 1;
  names.forEach(name => {
    name = name.slice(0,-9).trim();
    if (typeof uniqueNames[name] == 'undefined') {
      uniqueNames[name] = [folder];
    } else if (uniqueNames[name].indexOf(folder) < 0) {
      uniqueNames[name].push(folder);
    }
    console.log("    " + name);
    numberOfNames += 1;
  });
});
var uniqueNameNumber = 0;
var duplicates = 0;
Object.keys(uniqueNames).forEach(name => {
  if (uniqueNames[name].length > 1) {//this name has two different SSN!!!
    // console.log(name);
    // uniqueNames[name].forEach(SSN => {
    //   console.log('    ' + SSN);
    // });
    let SSNList = uniqueNames[name];
    for (let x = 0; x < SSNList.length - 1; x++) {
      let differences = 0;
      for (let y = 0; y < SSNList[x].length; y++) {
        if (SSNList[x][y] != SSNList[x+1][y]) differences += 1;
      }
      if (differences < 4) {
        for (z = x; z <= x + 1; z++) {
          var names = fs.readdirSync(filePath + '/' + SSNList[z]);
          names.forEach(movingName => {
            if (movingName.indexOf(name) >= 0) {
              exec(getCommandLine() + " \'" + filePath + '/' + SSNList[z] + '/' + movingName + "'");
            }
          });
        }
        duplicates += 1;
        let answer = rl.question(
          'Possible duplicate for name: ' + name + ' found.\n' +
            'Please enter the number of the correct SSN.\n' +
            '1. ' + SSNList[x] + '\n' +
            '2. ' + SSNList[x+1] + '\n' +
            'or N if they are different people\n');
        var moving;
        var destination;
        if (answer == '1') {
          moving = SSNList[x+1];
          destination = SSNList[x];
        } else if (answer == '2') {
          moving = SSNList[x];
          destination = SSNList[x+1];
        } else continue;
        var names = fs.readdirSync(filePath + '/' + moving);
        names.forEach(movingName => {
          if (movingName.indexOf(name) >= 0) {
            console.log('moving ' + movingName + ' from:\n' +
                        filePath + '/' + moving + '/' + movingName + '\n' +
                        'to: \n' +
                        filePath + '/' + destination + '/' + movingName);
            fs.renameSync(filePath + '/' + moving + '/' + movingName, filePath + '/' + destination + '/' + movingName);
            if (fs.readdirSync(filePath + '/' + moving).length == 0) {
              fs.rmdirSync(filePath + '/' + moving);
              console.log('The folder was empty so it was deleted!');
            }
          }
        });
      }
    }

    // let compareNumber = score(SSNList[x], SSNList[x+1], 1);
    // console.log(SSNList[x] + ' and ' + SSNList[x + 1] + ' are ' + compareNumber + ' similar.');
  }
});
// for (var name in uniqueNames) {
//   console.log(name + ': ' + uniqueNames[name]);
//   uniqueNameNumber += 1;
// }
