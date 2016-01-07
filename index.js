module.exports = {
    parse: function(folder, recurse) {

        var me = this;

        me.folder = folder;
        me.recurse = recurse;

        return null;
    },

    parseBlock: function(t) {
        var regex = /\/\*\*[\s]*((?:.|\s)*?)[\s]*\*\//g;
        var result = t.match(regex);
        return result;
    },

    parseDescription: function(t) {
        var regex = /\/\*\*[\s]*((?:.|\s)*?)(?:(?=\s\* @)|[^@].$)/;
        var result = t.match(regex);
        return result[result.length - 1].replace(/\n *[\*] *?/, '').trim();
    },

    parseParts: function(t) {
        return module.exports.commonPart('@param', 'params', true, t);
    },

    commonPart: function(partName, objectName, array, t) {
        var regex = new RegExp('(?:' + partName + ') (?:(\\S*)\\n|{(\\S*)} (\\S*)(?:\\n| (.*)\\n))', 'g');
        var result = {
            method: '',
            params: []
        };
        while ((m = regex.exec(t)) != null) {
            result.params.push({
                name: m[2] === undefined ? m[1] : m[3],
                type: m[1] === undefined ? m[2] : null,
                description: m[4] || null
            });
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
        }
        return result;
    }
};