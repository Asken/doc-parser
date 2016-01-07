// error when debugging using jetbrains
// https://youtrack.jetbrains.com/issue/IDEA-139990
var expect = require('chai').expect,
    should = require('chai').should(),
    //scapegoat = require('../index'),
    //escape = scapegoat.escape,
    //unescape = scapegoat.unescape,
    parser = require('../index'),
    fs = require('fs'),
    q = require('q');

/**
 * Method to read a file returing a promise
 */
function readFile(file, encoding, callback) {
    var deferred = q.defer();
    fs.readFile(file, encoding, function (err, data) {
        if (err)
            deferred.reject(err)
        else
            deferred.resolve(data);
    });
    return deferred.promise.nodeify(callback);
}

describe("parse", function() {
    var file = './test/data/simple/index.js';

    it ('Returns null if no path is specified', function() {
        should.not.exist(parser.parse(null, false));
    });

    it ('Should return two blocks', function(done) {
        readFile(file, 'utf8').then(function(blocks) {
            expect(parser.parseBlock(blocks).length).to.equal(4);
            done();
        });
    });

    // description
    var desc1 = '/** This is a description\n* and here\'s the ending\n */';
    it ('Should return the text between comments', function() {
        expect(parser.parseDescription(desc1)).to.equal('This is a description and here\'s the ending');
    });

    // method/param/name/return/static/protected/private/public/since
    var parts = '/**\n' +
        '* Description\n' +
        '* @method dude\n' +
        '* @param paramName1\n' +
        '* @param {type} paramName2\n' +
        '* @param {type2} paramName3 one with a description too\n' +
        '*/';
    var parsed = parser.parseParts(parts);
    it ('Should return three parameters', function() {
        expect(parsed.params.length).to.equal(3);
    });

    var _p = parsed.params;
    it ('Should return name for all three parameters', function() {
        expect(_p[0].name).to.equal('paramName1');
        expect(_p[1].name).to.equal('paramName2');
        expect(_p[2].name).to.equal('paramName3');
    });
});