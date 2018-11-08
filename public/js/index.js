const socket = io();

socket.on('connect', function () {
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});