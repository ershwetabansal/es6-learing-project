const noop = () => {}
class Carousel {

    constructor(options) {
        if (!Carousel.validate(options)) {
            throw new Error("Provide the correct options");
        }

        this.target = document.querySelector(options.target);
        this.template = options.template;
        this.carousel = document.createElement('div');
        this.target ? this.target.appendChild(this.carousel) : noop();
        this.source = options.source;
        this.index = 0;
        this.interval = options.interval ? options.interval : 0;

        options.next && document.querySelector(options.next) ? document.querySelector(options.next)
            .addEventListener('click', () => this.next()) : noop();
        options.prev && document.querySelector(options.prev) ? document.querySelector(options.prev)
            .addEventListener('click', () => this.prev()) : noop();

        // Execute in the end after all the setup is done
        this.source.length ? this.render() : noop();
    }

    static setup(options) {
        return new Carousel(options);
    }

    static validate(options) {
        var valid = true;

        if (!options.template) {
            console.log("Template is not provided");
            valid = false;
        }

        if (!options.source) {
            options.source = [];
        }

        if (!(options.source instanceof Array)) {
            console.log("Source should be an array");
            valid = false;
        }

        if (!options.target) {
            options.target = 'body';
        }

        return valid;
    }

    isReadyToRender() {
        return this.source.length > 0;
    }

    render() {
        if (!this.isReadyToRender()) {
            return;
        }

        let template = this.template;
        this.template
            .match(/{{\s*[\w\.]+\s*}}/g)
            .map(x => ({matcher : x, replacer : this.source[this.index][x.match(/[\w\.]+/)[0]]}))
            .forEach(item => (template = template.replace(item.matcher, item.replacer)));

        this.carousel.innerHTML = template;

        this.stop();
        this.start();
    }

    start() {
        this.interval > 0 ? this.auto = setInterval(() => this.next(), this.interval) : noop();
    }

    stop() {
        this.auto ? clearInterval(this.auto) : noop();
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
        (this.index > 0) ? (this.index--) : (this.index = this.source.length -1);
        this.render();
    }
}

module.exports = Carousel;