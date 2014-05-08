var test = require('grape'),
    gelTransform = require('../');

test('gelTransform Exists', function (t) {
    t.plan(2);
    t.ok(gelTransform, 'gelTransform Exists');
    t.equal(typeof gelTransform, 'function');
});

// TODO: Actualy test string concatenation...