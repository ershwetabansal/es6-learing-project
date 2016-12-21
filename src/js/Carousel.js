class Carousel {

    constructor(options) {
        this.target = document.getElementsByTagName(options.target);
        this.template = options.template;
        this.carousel = document.createElement('div');
        this.source = options.source;
        this.index = 0;
        this.source.length ? this.render() : '';
    }

    static setup(options) {
        if (!Carousel.validate(options)) {
            return;
        }

        return new Carousel(options);
    }

    isReadyToRender() {
        return this.source.length > 0;
    }
    render() {
        if (!this.isReadyToRender()) {
            return;
        }
        this.carousel.innerHTML = this.template
            .replace('{{ title }}', this.source[this.index].title)
            .replace('{{ description }}', this.source[this.index].description);

    }

    renderWith(source) {
        this.source = source;
        this.render();
    }

    html() {
        return this.carousel;
    }

    next() {
        (this.source.length > this.index + 1) ? (this.index++) : (this.index = 0);
        this.render();
    }

    prev() {
        (this.index > 0) ? (this.index--) : (this.index = this.source.length);
        this.render();
    }

    static validate(options) {
        if (!options.template) {
            throw new Error("Template is not provided");
        }

        if (!options.source) {
            options.source = [];
        }

        if (!options.target) {
            options.target = 'body';
        }

        return true;
    }
}

module.exports = Carousel;