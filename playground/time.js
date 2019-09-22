  var moment = require('moment');

  var createdAt = moment().valueOf();
  var date = moment(createdAt);
  console.log(date.format('h:mm a'));
//   date.add(100, 'year').subtract(9, 'months');
//   console.log(date.format('MMM Do, YYYY, h:mm:ss a'));
