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

        expect(filter.searchBox().length).toBe(2);
    });

    it("sets up a dropdown for filtering if configured", function () {
        document.body.innerHTML =  mock.list;
        let filter = Filter.setup({
            target : '#list',
            type : 'dropdown',
            options : ['Yes', 'No']
        });

        expect(filter.searchBox().tagName).toBe('SELECT');

    });

    it("allows to search based upon the text in the column by default", function () {
        // Given there is a list of books -
        // Assassin Of History
        // Assassin Quest
        // Defenders Of The North
        // Snakes Without Hate

        document.body.innerHTML =  mock.list;
        let filter = Filter.setup({
            target : '#list'
        });

        var list = document.getElementById('list');
        expect(list.getElementsByTagName('li').length).toBe(4);
        var event = new Event('onchange');

        // When I search for Assasin
        filter.searchBox().value = 'assassin';
        filter.searchBox().dispatchEvent(event);

        // Then I see 2 books with the names containing Assasin
        expect(list.getElementsByTagName('li').length).toBe(2);
        expect(list.innerHTML).toContain('Assassin Of History');
        expect(list.innerHTML).toContain('Assassin Quest');

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
        expect(list.getElementsByTagName('li').length).toBe(4);

    });

    it ("allows to search in first column of a table", function () {
        document.body.innerHTML =  mock.table;
        let filter = Filter.setup({
            target : '#table'
        });

        var table = document.getElementById('table').getElementsByTagName('tbody')[0];
        expect(table.getElementsByTagName('tr').length).toBe(6);
        var event = new Event('onchange');

        // When I search for Shantaram
        filter.searchBox()[0].value = 'shantaram';
        filter.searchBox()[0].dispatchEvent(event);

        // Then I see 2 duplicate records
        table = document.getElementById('table').getElementsByTagName('tbody')[0];
        expect(table.getElementsByTagName('tr').length).toBe(2);
        expect(table.innerHTML).toContain('Shantaram');

        // When I clear the search
        filter.searchBox()[0].value = '';
        filter.searchBox()[0].dispatchEvent(event);

        // Then I see all books
        table = document.getElementById('table').getElementsByTagName('tbody')[0];
        expect(table.getElementsByTagName('tr').length).toBe(6);
    });

    it("allows to search in the second column of a table", function() {
        document.body.innerHTML =  mock.table;
        let filter = Filter.setup({
            target : '#table'
        });

        var table = document.getElementById('table').getElementsByTagName('tbody')[0];
        expect(table.getElementsByTagName('tr').length).toBe(6);
        var event = new Event('onchange');

        // When I search for Khalid in the second column
        filter.searchBox()[1].value = 'Khaled';
        filter.searchBox()[1].dispatchEvent(event);

        // Then I see 2 records
        table = document.getElementById('table').getElementsByTagName('tbody')[0];
        expect(table.getElementsByTagName('tr').length).toBe(2);
        expect(table.innerHTML).toContain('Kite runner');
        expect(table.innerHTML).toContain('A thousand Splendid suns');

        // When I clear the search
        filter.searchBox()[1].value = '';
        filter.searchBox()[1].dispatchEvent(event);

        // Then I see all 5 books
        table = document.getElementById('table').getElementsByTagName('tbody')[0];
        expect(table.getElementsByTagName('tr').length).toBe(6);
    });

    it("allows to search based upon an attribute on each element if configured so", function () {

    });

    it("allows a concatenated search in different table columns", function () {

    });
});