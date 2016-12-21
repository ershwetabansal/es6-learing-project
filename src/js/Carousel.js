class Carousel {

    constructor(options) {
        this.target = document.getElementById(options.target);
        this.template = options.template;
        this.carousel = document.createElement('div');
    }

    static setup(options) {
        if (!Carousel.validate(options)) {
            return;
        }

        return new Carousel(options);
    }

    renderWith(items) {
        this.carousel.innerHTML = this.template
            .replace('{{ title }}', items[0].title)
            .replace('{{ description }}', items[0].description);
    }

    html() {
        return this.carousel;
    }

    static validate(options) {
        if (!options.template) {
            throw new Error("Template is not provided");
        }

        return true;
    }
}

module.exports = Carousel;