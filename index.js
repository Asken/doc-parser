module.exports = {
    parse: function(folder, recurse) {

        var me = this;

        me.folder = folder;
        me.recurse = recurse;

        return null;
    },

    parseBlock: function(block) {
        var regex = /\/\*\*[\s]*((?:.|\s)*?)[\s]*\*\//g;
        var result = block.match(regex);
        //console.log(result[0]);
        //console.log(result[1]);
        return result;
    }
};