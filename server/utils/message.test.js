const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		const from = 'John';
		const text = 'Some message';
		const message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			text
		});
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const from = 'John';
		const lat = 12;
		const long = 13;
		const url = 'https://www.google.com/maps?q=12,13';
		const message = generateLocationMessage(from, lat, long);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			url
		});
	});
});