var commands = require('./commands')
//Output prompt

var cmdList;
var i = 1;

process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim(); // remove the newline
  cmdList = cmdString.split(/\s*\|\s*/g)
  cmdList = cmdList.map(function(command){
  	return command.split(" ");
  });
  var commandArgs = cmdList[0].slice(1).join(" ");
  //process.stdout.write(firstCommandArgs);
  commands[cmdList[0][0]](null, commandArgs, done);
});

var done = function(output){
	while (cmdList[i]){
		commands[cmdList[i][0]](output, null, done);
		i++;
	}
	process.stdout.write(output);
  	process.stdout.write('\nprompt > ');
}