// Require the filesystem module
const fs = require('fs');

// file path to our client.html and style.css pages
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// calls to our client.html page (which is our index)
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// calls to our style.css page
const getCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// export our functions
module.exports = {
  getIndex,
  getCss,
};
