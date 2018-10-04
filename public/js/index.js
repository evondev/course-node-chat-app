const socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
	// emit custom event from server
	socket.emit('createMessage', {
		from: 'johnyenglish',
		text: 'Hello and have a good day'
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});
// create custom event - listen for event
socket.on('newMessage', function(newMessage) {
	console.log('newMessage', newMessage);
});



