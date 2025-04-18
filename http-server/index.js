const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

let homeContent = "";
let projectContent = "";
let registrationContent = "";
const args = minimist(process.argv.slice(2));

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }

  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }

  projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }

  registrationContent = registration;
});

http
  .createServer((request, response) => {
    let { url } = request;
    response.writeHeader(200, { "Content-Type": "text/html" });

    switch (url) {
      case "/project":
        response.write(projectContent);
        break;

      case "/registration":
        response.write(registrationContent);
        break;

      default:
        response.write(homeContent);
    }
    response.end();
  })
  .listen(args.port);
