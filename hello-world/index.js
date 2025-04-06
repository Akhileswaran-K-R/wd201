// const fs = require("fs");
// fs.writeFile(
//   "sample.txt",
//   "Hello World! Welcome to node.js File system module",
//   (err) => {
//     if (err) throw err;
//     console.log("File created");
//   }
// );

// fs.readFile("sample.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// fs.appendFile("sample.txt", " This is updated", (err) => {
//   if (err) throw err;
//   console.log("Updated file");
// });

// fs.rename("sample.txt", "test.txt", (err) => {
//   if (err) throw err;
//   console.log("Rename successfull");
// });

// //deletion
// fs.unlink("test.txt", (err) => {
//   if (err) throw err;
//   console.log("Deletion successful");
// });

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream("sample.txt");
  stream.pipe(res);
  // fs.readFile("sample.txt", (err, data) => {
  //   if (err) throw err;
  //   res.end(data);
  // });
});

server.listen(3000);
