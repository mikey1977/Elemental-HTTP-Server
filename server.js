var http = require("http");
var url = require("url");
var path = require("path");
var qs = require("querystring");
var fs = require("fs");

var PORT = 3000;

var server = http.createServer(function(request, response) {

  //respond to POST request with response code 200, content type : application/json, body of success : true
  // response.writeHead(200, { "Content-Type" : "application/json" }, { "Content-Body" : { "success" : true } } );


  //store new data
  var dataBuffer = "";

  //create listener for requests
  request.on("data", function(data) {

    //parse data
    dataBuffer += data;
    // console.log(dataBuffer);

  });

//need to parse dataBuffer in order to query

  //when client performs POST request with 4 required data fields:
    // elementName, elementSymbol, elementAtomicNumber, elementDescription
      //put elementName into title as "<title>The Elements - " + ElementName + "</title>"

  //create new file containing dynamic data, and write to public directory
    //file name is element's name appended with html file extension
      //e.g ./public/boron.html

  //Server will respond to POST request with http response code 200, content type of application/json, and body of { "success" : true}
  request.on("end", function() {
      var data = qs.parse( dataBuffer.toString() );
    // console.log(data);

    //object {key: value, ....}
    // var query = url.parse(request.url, true).query;
    var elementName = data.elementName;
    var elementSymbol = data.elementSymbol;
    var elementAtomicNumber = data.elementAtomicNumber;
    var elementDescription = data.elementDescription;

    // response.end("Elements" + elementName + " " + elementSymbol + " " + elementAtomicNumber + " " + elementDescription);

    response.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ' + elementName + '</title><link rel="stylesheet" href="/css/styles.css"></head><body><h1>' + elementName + '</h1><h2>' + elementSymbol + '</h2><h3>' + elementAtomicNumber + '</h3><p>' + elementDescription + '</p><p><a href="/">back</a></p></body></html>');

    fs.readFile('./index.html', function(error, content) {
      if (error) {
        response.writeHead(500);
        response.end();
      } else {
        response.writeHead(200, {'Content-Type' : 'application/json'})
        response.end(content);
      }
    })

    //create new file with elementName
    fs.writeFile('./public/' + 'test'.toLowerCase() + '.html', function(err) {
      if(err) throw new Error('could not write file');

      console.log('done writing to file');


    })
    // console.log(query);
  });

  //to show to postman
  // response.write('postman start');
  // response.end('postman end');

});

server.listen(PORT, function() {
  console.log("server listening on port " + PORT);
});