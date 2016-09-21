var pictionary = function(socket) {
    var canvas, context;

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,6, 0, 2 * Math.PI);
        context.fill();
    };
    
    var drawing=false;
    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    socket.on('enableCanvas',function(random){
	console.log(random);
	$('#guess input').val('Draw this word:'+random);
        $('#guess input').prop('disabled', true);
	canvas.on('mousemove', function(event) {
        var offset = canvas.offset();
        var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top};
        if(drawing){
           draw(position);
           socket.emit('draw',position);
        }       
        
       });

    canvas.on('mousedown',function(event){
        drawing=true;
    });
     canvas.on('mouseup',function(event){
        drawing=false;
    });
});	
    socket.on('draw',draw);	
    
	var guessBox;

	var onKeyDown = function(event) {
    		if (event.keyCode != 13) { // Enter
       		 return;
   	 }

    	var guess = guessBox.val();
       addGuess(guess);
	socket.emit('guess',guess);
    	guessBox.val('');
	};

	guessBox = $('#guess input');
	var guessDiv = $('#guess-div');
      
	guessBox.on('keydown', onKeyDown);
	var addGuess = function(guess) {
        guessDiv.append('<div>' + guess + '</div>');
    };
   socket.on('guess',function(guess){
	addGuess(guess);  	
    });
   	
};
$(document).ready(function() {
    var socket = io();	
    pictionary(socket);
});
