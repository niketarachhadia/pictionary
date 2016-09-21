var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var online = 0;
var words = ["word", "letter", "number", "person", "pen", "class", "people", "sound", "water", "side", "place", "man", "men", "woman", "women", "boy",
    "girl", "year", "day", "week", "month", "name", "sentence", "line", "air", "land", "home", "hand", "house", "picture", "animal", "mother", "father",
    "brother", "sister", "world", "head", "page", "country", "question", "answer", "school", "plant", "food", "sun", "state", "eye", "city", "tree",
    "farm", "story", "sea", "night", "day", "life", "north", "south", "east", "west", "child", "children", "example", "paper", "music", "river", "car",
    "foot", "feet", "book", "science", "room", "friend", "idea", "fish", "mountain", "horse", "watch", "color", "face", "wood", "list", "bird",
    "body", "dog", "family", "song", "door", "product", "wind", "ship", "area", "rock", "order", "fire", "problem", "piece", "top", "bottom", "king",
    "space"];
//var random = words[Math.floor(Math.random() * words.length)];
io.on('connection',function(socket){
    var random = words[Math.floor(Math.random() * words.length)];
    online++;
    if(online==1){
	socket.emit('enableCanvas',random);
	socket.emit('disableGuess');
    }
    console.log(online +':Clients online');	
    socket.on('draw',function(position){
	socket.broadcast.emit('draw',position);	   
    });
    socket.on('guess',function(guess){
    	socket.broadcast.emit('guess',guess);
    });
    socket.on('disconnect', function() {
	online--;
        console.log(online +':Clients online');
    });			
});

server.listen(process.env.PORT || 8089);
