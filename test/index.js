// error when debugging using jetbrains
// https://youtrack.jetbrains.com/issue/IDEA-139990
var expect = require('chai').expect,
    should = require('chai').should(),
    //scapegoat = require('../index'),
    //escape = scapegoat.escape,
    //unescape = scapegoat.unescape,
    parser = require('../index');

describe("parse", function() {
    var blocks = '/**\r\n' +
        '* This is the first description\r\n' +
        '* @method methodName1\r\n' +
        '* @param {type1} paramName1 This is the param description\r\n' +
        '* @param typeLessParamName1\r\n' +
        '* @return returnType1\r\n' +
        '*/\r\n' +
        '/**\r\n' +
        '* This is the second description\r\n' +
        '* @method methodName2\r\n' +
        '* @param {type2} paramName2 This is the param description\r\n' +
        '* @param typeLessParamName2\r\n' +
        '* @return returnType2\r\n' +
        '*/';

    it ('Returns null if no path is specified', function() {
        should.not.exist(parser.parse(null, false));
    });

    it ('Should return two blocks', function() {
        expect(parser.parseBlock(blocks).length).to.equal(2);
    });
});