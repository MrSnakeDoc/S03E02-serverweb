const fs = require("fs").promises;
const http = require("http"); // Import Node.js core module
let count = 0;
const requestListener = function (req, res) {
  if (req.url === "/favicon.ico") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.writeHead(404);
    res.end();
    return;
  }
  if (req.url === "/") {
    fs.readFile(__dirname + "/index.html")
      .then((contents) => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      })
      .catch((err) => {
        res.writeHead(500);
        res.end(err);
        return;
      });
  }
};
const host = "localhost";
const port = 5000;
const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
