const moment = require('moment');

const date = moment(1234);
const otherTime = moment().valueOf(); // new Date().getTime()
console.log(otherTime);
console.log(date.format('hh:mm a'));
console.log(date.fromNow());