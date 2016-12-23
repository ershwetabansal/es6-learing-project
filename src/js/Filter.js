const noop = () => {}
class Filter {

    constructor(options) {
        ((new.target === "Filter") ? () => {throw new Error("This class cannot be instantiated directly")} : noop)();

        this.target = options.target;
        this.cache = document.createElement('div');
        this.cache.innerHTML = this.target.outerHTML;
        this.searchField = (options.type == 'dropdown') ? document.createElement('select') : document.createElement('input');
    }

    static setup(options) {
        (options.target ? noop : () => {throw new Error("Target should be present")})();

        options.target = document.querySelector(options.target);
        return new filterClasses[options.target.tagName + "Filter"](options);
    }

    find(text, index) {
        this.target.innerHTML = this.getAllItems()
            .filter((item) => this.criteria(item, index).toLowerCase().includes(text.toLowerCase()))
            .map((item) => (item.outerHTML))
            .join("");
    }

    criteria(item) {
        return item.textContent;
    }

    getAllItems() {
        return [];
    }

    searchBox() {
        return this.searchField;
    }
}

let filterClasses = {};

filterClasses['ULFilter'] = class  extends Filter {

    constructor(options) {
        super(options);
        this.target.parentElement.insertBefore(this.searchField, this.target);
        this.searchField.addEventListener('keyup', (e) => this.find(e.target.value));
    }

    getAllItems() {
        return [].slice.call(this.cache.getElementsByTagName('li'));
    }
};

filterClasses['TABLEFilter'] = class  extends Filter {
    constructor(options) {
        super(options);
        this.searchField = createSearchTableFor(this.target.getElementsByTagName('tbody')[0]);
        this.target.parentElement.insertBefore(this.searchField, this.target);
        this.searchBox().forEach((search, index) => search.addEventListener('keyup', (e) => this.find(e.target.value, index)));
    }

    searchBox() {
        return cells(this.searchField, 0).map((item) => item.getElementsByTagName('input')[0]);
    }

    criteria(item, index) {
        return item.getElementsByTagName('td')[index].textContent;
    }

    getAllItems() {
        return [].slice.call(this.cache.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
    }
};

function cells(table, rowIndex) {
    return [].slice.call(table.getElementsByTagName('tr')[rowIndex].getElementsByTagName('td'));
}


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