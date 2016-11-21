var crypto = require('crypto');

(function () {
	var randid = crypto.randomBytes(8).toString('hex');
	console.log(randid);
})();