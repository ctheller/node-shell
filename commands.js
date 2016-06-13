var fs = require('fs');
var request = require('request');

module.exports = {

  pwd: function(stdin, file, done){
  	done(process.cwd());
	},
  date: function(stdin, file, done){
  	done(new Date().toGMTString());
  },
  ls: function(stdin, file, done){
  	fs.readdir('.', function(err, files) {
  		if (err) throw err;
      var output = "";
  		files.forEach(function(file) {
    		output+= file.toString() + "\n";
  		})
  		done(output);
	});
  },
  echo: function(stdin, file, done){
  	done(file);
  },
  cat: function(stdin, file, done){
  	fs.readFile(file, function(err, data) {
  	if (err) throw err;
  	done(data);
	});
  },
  head: function(stdin, file, done){
    if (stdin) {
      file = stdin;
    }
  	fs.readFile(file, 'utf8', function(err, data) {
  	if (err) throw err;
  	data = data.split("\n").slice(0,5).join("\n");
  	done(data);
	});
  },
  tail: function(stdin, file, done){
    if (stdin) {
      file = stdin;
    }
  	fs.readFile(file, 'utf8', function(err, data) {
  	if (err) throw err;
  	data = data.split("\n").slice(-5).join("\n");
  	done(data);
	});
  },
    sort: function(stdin, file, done){
    if (stdin) {
      file = stdin;
    }
  	fs.readFile(file, 'utf8', function(err, data) {
  	if (err) throw err;
  	data = data.split("\n").sort().join("\n");
	  fs.writeFile(file, data, function(err){
		if (err) throw err;
		done(data);
	  })
	  });
    },
  wc: function(stdin, file, done){
    if (stdin) {
      file = stdin;
    }
  	fs.readFile(file, 'utf8', function(err, data) {
  	if (err) throw err;
  	data = data.split("\n").length.toString();
	  done(data);
	  });
  },
  uniq: function(stdin, file, done){
    if (stdin) {
      file = stdin;
    }
  	fs.readFile(file, 'utf8', function(err, data) {
  	if (err) throw err;
  	data = data.split("\n");
  	var newData = [];
  	for (var i=0; i<data.length;i++){
  		if (data[i]!==data[i+1]){
  			newData.push(data[i]);
  		}
  	}
  	var newDataString = newData.join("\n");
	fs.writeFile(file, newDataString, function(err){
		if (err) throw err;
		done(newDataString);
	})
	});
  },
  curl: function(stdin, file, done){
    if (!file.includes("http://")){
      file = "http://"+file;
    }
    request(file, function (err, response, body) {
      if (err) throw err;
      if (!err && response.statusCode == 200) {
        done(body);
      }
    })
  }
}