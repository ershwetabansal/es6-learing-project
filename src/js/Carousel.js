class Carousel {

    constructor(options) {
        this.target = document.getElementsByTagName(options.target);
        this.template = options.template;
        this.carousel = document.createElement('div');
        this.source = options.source;
        this.index = 0;
        this.interval = options.interval ? options.interval : 0;

        // Execute in the end after all the setup is done
        this.source.length ? this.render() : '';
    }

    static setup(options) {
        if (!Carousel.validate(options)) {
            return;
        }

        return new Carousel(options);
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

    isReadyToRender() {
        return this.source.length > 0;
    }

    render() {
        if (!this.isReadyToRender()) {
            return;
        }
        let template = this.template;
        parseMustache(this.template).forEach(item => (template = template.replace(item.matcher, this.source[this.index][item.replacer])));
        this.carousel.innerHTML = template;

        function parseMustache(str) {
            return str.match(/{{\s*[\w\.]+\s*}}/g).map(x => ({matcher : x, replacer : x.match(/[\w\.]+/)[0]}));
        }

        if (this.interval > 0) {
            this.auto ? clearInterval(this.auto) : '';
            this.auto = setInterval(() => this.next(), this.interval);
        }
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
}

module.exports = Carousel;