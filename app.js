//all files needed to manipulate data
var fs = require('fs');

//written to uber.txt
var uberFileContents = "My hackathon idea is, rides for homeless people";

console.log('init');

//function(err) is callback, will file when write is complete
fs.writeFile('uber.txt', uberFileContents, function(err) {
  if(err) throw new Error("could not write to uber.txt: " + err.message);

  console.log("done writing to uber.txt");

  fs.readFile('uber.txt', function(err, uberTxtContentsBuffer) {
  if (err) throw new Error( "could not read uber.txt " + err.message);

  console.log(uberTxtContentsBuffer.toString());
});

console.log('complete'); //init complete My hackathon....
});
//will return init, complete, My hackathon idea is...


// //sync is blocking, node app.js will return: init, [Function], complete
// var uberTxtContents = fs.readFileSync('uber.txt');
// console.log(uberTxtContents.toString);

// console.log('complete');

// //with node, all default cases will be async

// fs.readFile('uber.txt', function(err, uberTxtContentsBuffer) {
//   if (err) throw new Error( "could not read uber.txt " + err.message);

//   console.log(uberTxtContentsBuffer.toString());
// });

// console.log('complete'); //init complete My hackathon....