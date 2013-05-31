#!/usr/bin/env node

var through = require('through'),
	Gedi = require('gedi'),
	gedi = new Gedi();

module.exports = function (file) {
    if (!/\.gel/.test(file)) return through();

    var buffer = "";

    return through(function(chunk) {
        buffer += chunk.toString();
    },
    function() {
        var tokens = gedi.gel.tokenise(buffer),
            compiled = "module.exports = '";

        for (var i = 0; i < tokens.length; i++) {
          if(tokens[i].name !== 'delimiter'){
            compiled += tokens[i].original;
          } else {
            var before = tokens[i - 1];

            if(before && before.name !== 'delimiter'){
                compiled += ' ';
            }
          }
        }

        compiled += "';";

        this.queue(compiled);
        this.queue(null);
    });
};