var mock = require('../Mock.js');
var Carousel = require('../../src/js/Carousel.js');
describe("A carousel widget", function () {

    beforeEach(function () {
        document.body.innerHTML = '<div id="carousel"></div>';
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    it("can be setup with source and displays the first item from source.", function () {
        var carousel = Carousel.setup({
            template : '<div>{{ title }}</div><div>{{ description }}</div>',
            source : mock.books
        });

        var element = carousel.html();

        expect(element.innerHTML).toContain(mock.books[0].title);
        expect(element.innerHTML).toContain(mock.books[0].description);
    });

    it("can be setup without the source and allows to render the carousel after setup.", function () {
        var carousel = Carousel.setup({
            template : '<div>{{ title }}</div><div>{{ description }}</div>'
        });

        carousel.renderWith(mock.books);

        expect(carousel.html().innerHTML).toContain(mock.books[0].title);
        expect(carousel.html().innerHTML).toContain(mock.books[0].description);
    });

    it("displays the next item from source on browsing to the next.", function () {
        var carousel = Carousel.setup({
            template : '<div>{{ title }}</div><div>{{ description }}</div>',
            source : mock.books
        });

        carousel.next();
        expect(carousel.html().innerHTML).toContain(mock.books[1].title);
        expect(carousel.html().innerHTML).toContain(mock.books[1].description);

    });

    it("displays the previous item from source on browsing to the previous.", function () {
        var carousel = Carousel.setup({
            template : '<div>{{ title }}</div><div>{{ description }}</div>',
            source : mock.books
        });

        carousel.next();
        expect(carousel.html().innerHTML).toContain(mock.books[1].title);
        expect(carousel.html().innerHTML).toContain(mock.books[1].description);

        carousel.prev();
        expect(carousel.html().innerHTML).toContain(mock.books[0].title);
        expect(carousel.html().innerHTML).toContain(mock.books[0].description);
    });

    it("allows you to configure multiple carousels with different templates and source", function () {
        var booksCarousel = Carousel.setup({
            template : '<div>{{ title }}</div><div>{{ description }}</div>',
            source : mock.books
        });

        expect(booksCarousel.html().innerHTML).toContain(mock.books[0].title);
        expect(booksCarousel.html().innerHTML).toContain(mock.books[0].description);

        var imageCarousel = Carousel.setup({
            template : '<img src="{{ source }}" alt="{{ name }}"/>',
            source : mock.images
        });
        expect(imageCarousel.html().innerHTML).toContain(mock.images[0].source);
        expect(imageCarousel.html().innerHTML).toContain(mock.images[0].name);
    });

    it("automatically moves the carousel from one item to another in a given interval if configured.", function (done) {
        var carousel = Carousel.setup({
            template : '<div>{{ title }}</div><div>{{ description }}</div>',
            source : mock.books,
            interval : 1000
        });

        expect(carousel.html().innerHTML).toContain(mock.books[0].title);
        expect(carousel.html().innerHTML).toContain(mock.books[0].description);
        setTimeout(function () {
            expect(carousel.html().innerHTML).toContain(mock.books[1].title);
            expect(carousel.html().innerHTML).toContain(mock.books[1].description);

            setTimeout(function () {
                expect(carousel.html().innerHTML).toContain(mock.books[2].title);
                expect(carousel.html().innerHTML).toContain(mock.books[2].description);

                done();
            }, 1000);
        }, 1000);

    });

    it("displays the carousel under a configured target", function () {
        document.body.innerHTML = '<div id="app"></div>';
        Carousel.setup({
            template : '<div>{{ title }}</div><div>{{ description }}</div>',
            source : mock.books,
            target : '#app'
        });

        let target = document.getElementById('app');
        expect(target.innerHTML).toContain(mock.books[0].title);
        expect(target.innerHTML).toContain(mock.books[0].description);
    });

});