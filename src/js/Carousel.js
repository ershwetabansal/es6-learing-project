class Carousel {

    constructor(options) {
        this.target = document.getElementById(options.target);
        this.template = options.template;

    }

    static setup(options) {
        if (!Carousel.validate(options)) {
            return;
        }

        return new Carousel(options);
    }

    renderWith(items) {
        this.carousel = document.createElement('div');
        this.target.appendChild(this.carousel);

        this.carousel.innerHTML = this.template
            .replace('{{ title }}', items[0].title)
            .replace('{{ description }}', items[0].description);
    }

    static validate(options) {
        var valid = true;
        if (!options.target) {
            console.error("target is not provided");
            valid = false;
        }

        if (!options.template) {
            console.error("Template is not provided");
            valid = false;
        }

        return valid;
    }
}

module.exports = Carousel;