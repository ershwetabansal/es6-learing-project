const noop = () => {}
class Filter {

    constructor(options) {
        ((new.target === "Filter") ? () => {throw new Error("This class cannot be instantiated directly")} : noop)();

        this.target = options.target;
        this.search = document.createElement('input');
    }

    static setup(options) {
        (options.target ? noop : () => {throw new Error("Target should be present")})();

        options.target = document.querySelector(options.target);
        let filter = options.target.tagName + "Filter";
        return new filterClasses[filter](options);
    }

    searchBox() {
        return this.search;
    }
}

let filterClasses = {};

filterClasses['ULFilter'] = class  extends Filter {

    constructor(options) {
        super(options);
        document.body.insertBefore(this.search, this.target);
    }

};

filterClasses['TABLEFilter'] = class  extends Filter {
    constructor(options) {
        super(options);
        let columns = this.target.getElementsByTagName('tr')[0].getElementsByTagName('td');
        let searchRow = document.createElement('tr');
        for (let i = 0; i < columns.length; i++) {
            let search = document.createElement('input');
            let searchColumn = document.createElement('td');
            searchColumn.appendChild(search);
            searchRow.appendChild(searchColumn);
        }

        this.search = document.createElement('table');
        this.search.appendChild(searchRow);
        document.body.insertBefore(this.search, this.target);
    }
};

module.exports = Filter;