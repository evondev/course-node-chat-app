const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

// io.on is special not to make other
io.on('connection', (socket) => {
	console.log('New user connected');
	// emit custom event from client
	socket.emit('newMessage', {
		from: 'John',
		text: 'see you then',
		createAt: 123123
	});
	// create custom event from server
	socket.on('createMessage', (newMessage) => {
		console.log('createMessage', newMessage);
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

});

server.listen(port, () => {
	console.log(`Starting on port ${port}`);
});
