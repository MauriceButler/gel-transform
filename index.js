var through = require('through'),
	gelMinifier = require('gel-minifier');

module.exports = function (file) {
    if (!/\.gel/.test(file)) {
       return through();
    }

    var buffer = "";

    return through(function(chunk) {
        buffer += chunk.toString();
    },
    function() {
        var compiled = "module.exports = '";

        compiled += gelMinifier(buffer);
        compiled += "';";

        this.queue(compiled);
        this.queue(null);
    });
};