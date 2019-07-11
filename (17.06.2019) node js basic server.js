const connect = require('connect');
const serveStatic = require('serve-static');
const args = process.argv.slice(2);
const path = require("path");
var p = ".";
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(args[0]);
if (args[0]) {
  p = path.resolve(args[0]);
  readline.question("You're going to host directory \"" + p + "\". Proceed? (Y/n)", handleHostConfirmation);
}
else {
  console.error("ERROR! No valid directory specified as first parameter.");
  console.log("Aborting...");
  process.exit();
}

function handleHostConfirmation(confirmation) {
  if (confirmation == "" || confirmation == "y" || confirmation == "Y") {
    connect().use(serveStatic(p)).listen(8080, function() {
      console.log('Server running on 8080...');
    });
  }
  else {
    console.log("Aborting...");
    process.exit();
  }
}
