var mock = require('../Mock.js');
var Filter = require('../../src/js/Filter.js');

describe("Filter widget", function () {

    it("sets up a filter on a list.", function () {
        document.body.innerHTML = mock.list(mock.books, 'title').outerHTML;
        let filter = Filter.setup({
            target : '#list'
        });

        expect(filter.searchBox().tagName).toBe('INPUT');
    });

    it("sets up a filter on the columns of a table", function () {
        // Given there is a table with 2 columns
        document.body.innerHTML = mock.table(mock.books, ['title', 'author']).outerHTML;
        let filter = Filter.setup({
            target : '#table'
        });

        expect(filter.searchBox().length).toBe(2);
    });

    it("sets up a dropdown for filtering if configured", function () {
        document.body.innerHTML =  mock.list(mock.books, 'title').outerHTML;
        let filter = Filter.setup({
            target : '#list',
            type : 'dropdown',
            options : ['Yes', 'No']
        });

        expect(filter.searchBox().tagName).toBe('SELECT');

    });

    it("allows to search based upon the text in the column by default", function () {
        // Given there is a list of books -
        document.body.innerHTML =  mock.list(mock.books, 'title').outerHTML;
        let filter = Filter.setup({
            target : '#list'
        });

        var list = document.getElementById('list');
        expect(list.getElementsByTagName('li').length).toBe(9);
        var event = new Event('keyup');

        // When I search for Assasin
        filter.searchBox().value = 'assassin';
        filter.searchBox().dispatchEvent(event);

        // Then I see 1 book with the names containing Assasin
        expect(list.getElementsByTagName('li').length).toBe(1);
        expect(list.innerHTML).toContain('Assassin Of History');

        // When I search for 'Snakes'
        filter.searchBox().value = 'Snakes';
        filter.searchBox().dispatchEvent(event);

        // Then I see 1 book containing the word 'Snakes'
        expect(list.getElementsByTagName('li').length).toBe(1);
        expect(list.innerHTML).toContain('Snakes Without Hate');


        // When I clear the search
        filter.searchBox().value = '';
        filter.searchBox().dispatchEvent(event);

        // Then I see all 5 books
        expect(list.getElementsByTagName('li').length).toBe(9);

    });

    it ("allows to search in first column of a table", function () {
        document.body.innerHTML =  mock.table(mock.books, ['title', 'author']).outerHTML;
        let filter = Filter.setup({
            target : '#table'
        });

        expect(rows('table').length).toBe(9);
        var event = new Event('keyup');

        // When I search for Shantaram
        filter.searchBox()[0].value = 'shantaram';
        filter.searchBox()[0].dispatchEvent(event);

        // Then I see 2 duplicate records
        expect(rows('table').length).toBe(1);
        expect(tableBody('table').innerHTML).toContain('Shantaram');

        // When I clear the search
        filter.searchBox()[0].value = '';
        filter.searchBox()[0].dispatchEvent(event);

        // Then I see all books
        expect(rows('table').length).toBe(9);
    });

    it("allows to search in the second column of a table", function() {
        document.body.innerHTML =  mock.table(mock.books, ['title', 'author']).outerHTML;
        let filter = Filter.setup({
            target : '#table'
        });

        expect(rows('table').length).toBe(9);
        var event = new Event('keyup');

        // When I search for Khalid in the second column
        filter.searchBox()[1].value = 'Khaled';
        filter.searchBox()[1].dispatchEvent(event);

        // Then I see 2 records
        expect(rows('table').length).toBe(2);
        expect(tableBody('table').innerHTML).toContain('Kite runner');
        expect(tableBody('table').innerHTML).toContain('A thousand Splendid suns');

        // When I clear the search
        filter.searchBox()[1].value = '';
        filter.searchBox()[1].dispatchEvent(event);

        // Then I see all 5 books
        expect(rows('table').length).toBe(9);
    });

    it("allows a concatenated search in different table columns", function () {
        document.body.innerHTML =  mock.table(mock.books, ['title', 'author']).outerHTML;
        let filter = Filter.setup({
            target : '#table'
        });

        expect(rows('table').length).toBe(9);
        var event = new Event('keyup');

        // When I search for Kite in the first column and Khaled in the second column
        filter.searchBox()[0].value = 'kite';
        filter.searchBox()[0].dispatchEvent(event);

        filter.searchBox()[1].value = 'khaled';
        filter.searchBox()[1].dispatchEvent(event);

        // Then I see 1 record
        expect(rows('table').length).toBe(1);
        expect(tableBody('table').innerHTML).toContain('Kite runner');
        expect(tableBody('table').innerHTML).toContain('Khaled Hosseini');
    });

    it("throws an error if tried to setup a filter on a span", function () {
        document.body.innerHTML = '<span></span>';
        try {
            Filter.setup({ target : 'span' });
        } catch (err) {
            expect(err.message).toBe('SPAN can not be setup for filtering.');
        }
    });

    it("filters from the new set of table when table is changed", function () {
        document.body.innerHTML =  mock.table(mock.books, ['title', 'author']).outerHTML;
        let filter = Filter.setup({
            target : '#table'
        });

        expect(rows('table').length).toBe(9);
        var event = new Event('keyup');

        // When I search for Shantaram
        filter.searchBox()[0].value = 'Shantaram';
        filter.searchBox()[0].dispatchEvent(event);

        // Then I see 1 record
        expect(rows('table').length).toBe(1);
        expect(tableBody('table').innerHTML).toContain('Shantaram');


        // When table data is updated
        document.getElementById('table').innerHTML =  mock.table(mock.books.splice(5), ['title', 'author']).innerHTML;
        filter.updateContent();

        // Then I see that there are no rows present because 'Shantaram' is not there in the new data
        expect(rows('table').length).toBe(0);

        // When I search for Mountain now in the first column
        filter.searchBox()[0].value = 'mountain';
        filter.searchBox()[0].dispatchEvent(event);

        // Then I see one record
        expect(rows('table').length).toBe(1);

    });

    it("allows to search based upon an attribute on each element if configured so", function () {

    });

    function tableBody(tableID) {
        return document.getElementById(tableID).getElementsByTagName('tbody')[0];
    }
    function rows(tableID) {
        return tableBody(tableID) ? tableBody(tableID).getElementsByTagName('tr') : document.getElementById(tableID).getElementsByTagName('tbody');
    }
});