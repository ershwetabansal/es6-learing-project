var mock = require('../Mock.js');
var Filter = require('../../src/js/Filter.js');

describe("Filter widget", function () {

    it("sets up a filter on a list.", function () {
        document.body.innerHTML = mock.list;
        let filter = Filter.setup({
            target : '#list'
        });

        expect(filter.searchBox().tagName).toBe('INPUT');
    });

    it("sets up a filter on the columns of a table", function () {
        // Given there is a table with 2 columns
        document.body.innerHTML = mock.table;
        let filter = Filter.setup({
            target : '#table'
        });

        expect(filter.searchBox().getElementsByTagName('input').length).toBe(2);
    });

    it("sets up a dropdown for filtering if configured", function () {
        document.body.innerHTML = '<ul id="list"><li></li></ul>';
        let filter = Filter.setup({
            target : '#list',
            type : 'dropdown',
            options : ['Yes', 'No']
        });

        expect(filter.searchBox().innerHTML).toContain('select');

    });

    it("allows to search based upon the text in the column by default", function () {

    });

    it("allows to search based upon an attribute on each element if configured so", function () {

    });

    it("allows a concatenated search in different table columns", function () {

    });
});