var mock = require('../Mock.js');
var Carousel = require('../../src/js/Carousel.js');
describe("A carousel widget ", function () {

    beforeEach(function () {
        document.body.innerHTML = '<div id="carousel"></div>';
    });

    it("displays one item at a item from a list of items.", function () {
        var carousel = Carousel.setup({
            template : '<div>{{ title }}</div><div>{{ description }}</div>',
        });

        carousel.renderWith(mock.books);

        var element = carousel.html();

        expect(element.innerHTML).toContain(mock.books[0].title);
        expect(element.innerHTML).toContain(mock.books[0].description);
    });

    it("displays the next item from a list on browsing to the next.", function () {

    });

    it("displays the previous item from a list on browsing to the previous.", function () {

    });

    it("moves the carousel from item to another with a given interval if configured.", function () {

    });
});