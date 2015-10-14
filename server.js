var http = require("http");
var url = require("url");
var path = require("path");
var qs = require("querystring");
var fs = require("fs");

var PORT = 3000;

var server = http.createServer(function(request, response) {

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
    var urlData = url.parse( request.url );
    // console.log(data);

    var elementName = data.elementName;
    var elementSymbol = data.elementSymbol;
    var elementAtomicNumber = data.elementAtomicNumber;
    var elementDescription = data.elementDescription;
    var elements = elementName + '.html';

    var urlElementName = urlData.elementName;
    var urlElementSymbol = urlData.elementSymbol;
    var urlElementAtomicNumber = urlData.elementAtomicNumber;
    var urlElementDescription = urlData.elementDescription;
    var urlElements = urlElementName + '.html';

    // Post works, remove response.end when Get is working
    var contents = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>The Elements - ' + elementName + '</title><link rel="stylesheet" href="/css/styles.css"></head><body><h1>' + elementName + '</h1><h2>' + elementSymbol + '</h2><h3>' + elementAtomicNumber + '</h3><p>' + elementDescription + '</p><p><a href="/">back</a></p></body></html>';

    if (request.method === 'GET') {
        console.log("I am in the get request");
        // console.log(elements);

      //elements should be url - parse

      fs.readFile('./public/' + urlData.path, function(err, data) {
        console.log(urlElements);
        if (err) {
          response.end('./public/404.html');
        } else

          //send contents of file
          // console.log(data.toString());
          response.end(data.toString());
      })
    }

    if (request.url === '/elements') {

      //create NEW file with elementName
      fs.writeFile('./public/' + elementName.toLowerCase() + '.html', contents, function(err) {
        if (err) throw new Error('could not write file');

        // console.log('done writing to file');
        response.writeHead(200, { 'Content-Type' : 'application/json' });
        // response.end(contents);
        response.end(JSON.stringify({ 'success' : true }));
      });
    }
  });
});

server.listen(PORT, function() {
  console.log("server listening on port " + PORT);
});