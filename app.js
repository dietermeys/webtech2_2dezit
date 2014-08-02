var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	mongoose = require('mongoose');

server.listen(3000);

mongoose.connect('mongodb://localhost/scoreboard', function(err){
	if(err){
		console.log(err);
		console.log('mislukt, maar waarom??');
	}
	else{
		console.log('Connected');
	}
});

var scoreboardSchema = mongoose.Schema({
	id: Number,
	min: String,
	msg: String
});

var Update = mongoose.model('Update', scoreboardSchema);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/admin.html');
});
app.get('/scoreboard.html', function (req, res) {
  res.sendfile(__dirname + '/scoreboard.html');
});
app.get('/admin.html', function (req, res) {
  res.sendfile(__dirname + '/admin.html');
});

app.use(express.static(__dirname + '/public')); //css

io.sockets.on('connection', function(socket){

	var query = Update.find({});
	query.sort('created').exec(function(err, docs){		//exec laat het werken
		if(err) throw err;
		socket.emit('load old updates', docs);
	});

	socket.on('send update', function(data){
	//	var newMsg = new Update(data);//document aanmaken
	//	newMsg.save(function(err){ //save
	//		if(err) throw  err;
	//	});
		io.sockets.emit('new update', data);//iedereen kan het zien(ook ik)
	});
	socket.on('send time', function(data1){
	//	var newMsg = new Update(data);//document aanmaken
	//	newMsg.save(function(err){ //save
	//		if(err) throw  err;
	//	});
		io.sockets.emit('new time', data1);//iedereen kan het zien(ook ik)
	});
});
