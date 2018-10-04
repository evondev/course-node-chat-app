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

io.on('connection', (socket) => {
	console.log('New user connected');

	// server send data to client
	// one tab
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app'
	});
	// all tabs
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	});

	//server receive data from client
	socket.on('createMessage', (newMessage) => {
		console.log('createMessage', newMessage);
		// make for all tabs
		io.emit('newMessage', {
			from: newMessage.from,
			text: newMessage.text,
			createdAt: new Date().getTime()
		});
		// socket.broadcast.emit('newMessage', {
		// 	from: newMessage.from,
		//  	text: newMessage.text,
		//  	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

});

server.listen(port, () => {
	console.log(`Starting on port ${port}`);
});
