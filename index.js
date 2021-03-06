var through = require('through'),
	gelMinifier = require('gel-minifier'),
    Gedi = require('gedi'),
    gedi = new Gedi(),
    gelMinifier = require('gel-minifier')(function (expression){
        return gedi.gel.tokenise(expression);
    });

module.exports = function (file) {
    if (!/\.gel/.test(file)) {
       return through();
    }

    var buffer = '';

    return through(function(chunk) {
        buffer += chunk.toString();
    },
    function() {
        var compiled = "module.exports = '";

        compiled += gelMinifier(buffer);
        compiled += "';";
        compiled += "\n/*\n" + buffer + "\n*/";

        this.queue(compiled);
        this.queue(null);
    });
};