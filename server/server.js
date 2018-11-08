const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, isLowerText} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on("join", (params, callback) => {
		if (!isRealString(params.name) || !isRealString(isLowerText(params.room))) {
			return callback("Name and room name are required");
		}
		if(users.getExistName(params.name, isLowerText(params.room)) && users.getUserList(isLowerText(params.room)).length >=1) {
			return callback("Your display name is already exist");
		}

		socket.join(isLowerText(params.room));
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, isLowerText(params.room));

		io.to(isLowerText(params.room)).emit('updateUserList', users.getUserList(isLowerText(params.room)));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(isLowerText(params.room)).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));

		callback();
	});

	socket.on('createMessage', (message, callback) => {
		const user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		const user = users.getUser(socket.id);

		if (user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});

	socket.on('disconnect', () => {
		const user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});

});

server.listen(port, () => {
	console.log(`Starting on port ${port}`);
});
