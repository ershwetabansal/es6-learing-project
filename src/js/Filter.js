const noop = () => {}
class Filter {

    constructor(options) {
        ((new.target === "Filter") ? () => {throw new Error("This class cannot be instantiated directly")} : noop)();

        this.target = options.target;
        this.cache = document.createElement('div');
        this.cache.innerHTML = this.target.innerHTML;
        this.search = (options.type == 'dropdown') ? document.createElement('select') : document.createElement('input');
    }

    static setup(options) {
        (options.target ? noop : () => {throw new Error("Target should be present")})();

        options.target = document.querySelector(options.target);
        let filter = options.target.tagName + "Filter";
        return new filterClasses[filter](options);
    }

    find(text) {
        this.target.innerHTML = this.getAllItems()
            .filter((item) => item.textContent.toLowerCase().includes(text.toLowerCase()))
            .map((item) => (item.outerHTML)).join("");
    }

    getAllItems() {
        return [];
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
        this.search.addEventListener('onchange', (e) => this.find(e.target.value));
    }

    getAllItems() {
        return [].slice.call(this.cache.getElementsByTagName('li'));
    }
};

filterClasses['TABLEFilter'] = class  extends Filter {
    constructor(options) {
        super(options);
        this.search = createSearchTableFor(this.target);
        document.body.insertBefore(this.search, this.target);
    }
};



function createSearchTableFor(table) {
    let columns = table.getElementsByTagName('tr')[0].getElementsByTagName('td');
    let searchRow = document.createElement('tr');
    for (let i = 0; i < columns.length; i++) {
        let search = document.createElement('input');
        let searchColumn = document.createElement('td');
        searchColumn.appendChild(search);
        searchRow.appendChild(searchColumn);
    }
    let searchTable = document.createElement('table');
    searchTable.appendChild(searchRow);

    return searchTable;
}

module.exports = Filter;