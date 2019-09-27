// Modules necessary for server building
const http = require('http');
const url = require('url');
const query = require('querystring');

// Modules made by dev (myself)
const jsonHandler = require('./jsonResponses.js');
const htmlHandler = require('./htmlResponses.js');

// port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// GET requests
const handleGet = (request, response, parsedUrl) => {
  // handle getting the users via GET request
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCss(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

// POST requests
const handlePost = (request, response, parsedUrl) => {
  // post on addUser
  if (parsedUrl.pathname === '/addUser') {
    const res = response;

    // uploads arrive as byte stream that must be converted
    // into readable format
    const body = [];

    // whenever our request encounters an error, print
    // to our console, and give us a 400 error
    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    // when successful, push our data to our
    // body
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      // combine the byte array (body[])
      // change it to string readable format
      const bodyString = Buffer.concat(body).toString();
      // parse bodyString into an object
      const bodyParams = query.parse(bodyString);
      // add the user using addUser function
      jsonHandler.addUser(request, res, bodyParams);
    });
  }
};

// HEAD requests
/* /const handleHead = (request, response, parsedUrl) => {

}; */

const onRequest = (request, response) => {
  // parse the request into usable url
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'HEAD') {
    // handleHead(request, response, parsedUrl);
    console.dir('Head handling');
  } else {
    handleGet(request, response, parsedUrl);
    // console.dir('utilzing GET');
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port: ${port}`);
