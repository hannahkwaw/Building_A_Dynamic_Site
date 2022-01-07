// Problem: We need a simple way to look at the usersbatch count and javascript points from a web browser
// SOULTION: Use Node.js to perform the profilr look ups and server our template via HTTP.

var router = require("./router");
//Create a web server
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}: /${port}`);
});

// Function that handles the reading of files and merge in value
