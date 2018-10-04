const socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});
// create custom event - listen for event
socket.on('newMessage', function(newMessage) {
	console.log('newMessage', newMessage);
});



