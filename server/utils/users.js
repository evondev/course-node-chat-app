// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
	constructor () {
		this.users = [];
	}

	addUser(id, name, room) {
		const user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser(id) {
		// return user that was removed
		const userIndex = this.users.findIndex((u) => u.id === id);
		if (userIndex !== -1) {
			return this.users.splice(userIndex, 1)[0];
		}
		return false;
	}

	getUser(id) {
		return this.users.find((u) => u.id === id);
	}

	getUserList(room) {
		const users = this.users.filter((user) => user.room === room);
		const namesArray = users.map((user) => user.name);

		return namesArray;
	}
}

module.exports = {Users};