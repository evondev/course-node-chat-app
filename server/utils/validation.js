const isRealString = (str) => {
	return typeof str === 'string' && str.trim().length > 0;
};

const isLowerText = str => str.toLowerCase();

module.exports = {isRealString, isLowerText};