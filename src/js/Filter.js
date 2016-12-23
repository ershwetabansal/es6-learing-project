const noop = () => {};

/**
 * An abstract class to setup a filter in the DOM.
 * It can be extended to create a filter for Table, List etc.
 */
class Filter {

    constructor(options) {
        ((new.target === "Filter") ? () => {throw new Error("This class cannot be instantiated directly")} : noop)();

        this.target = options.target;
        this.cache = document.createElement('div');
        this.cache.innerHTML = this.target.outerHTML;
        this.searchField = this.getSearchBox(options);
        this.target.parentElement.insertBefore(this.searchField, this.target);
        this.setupSearchListener();
    }

    static setup(options) {
        (options.target ? noop : () => {throw new Error("Target should be present")})();

        options.target = document.querySelector(options.target);
        if (filterClasses.hasOwnProperty(options.target.tagName + "Filter")) {
            return new filterClasses[options.target.tagName + "Filter"](options);
        }

        throw new Error(options.target.tagName + " can not be setup for filtering.");
    }

    find() {
        this.target.innerHTML = this.items()
            .filter((item) => this.criteria(item))
            .map((item) => (item.outerHTML))
            .join("");
    }

    criteria(item) {
        return item.textContent.toLowerCase().includes((this.searchBox().value) ? this.searchBox().value.toLowerCase() : '');
    }

    items() {
        return [];
    }

    getSearchBox(options) {
        return (options.type == 'dropdown') ? document.createElement('select') : document.createElement('input');
    }

    setupSearchListener() {
        this.searchField.addEventListener('keyup', (e) => this.find(e.target.value));
    }

    searchBox() {
        return this.searchField;
    }
}

let filterClasses = {};

filterClasses['ULFilter'] = class extends Filter {

    items() {
        return listItems(this.cache);
    }
};

filterClasses['TABLEFilter'] = class extends Filter {

    getSearchBox(options) {
        return createSearchTableFor(this.target.getElementsByTagName('tbody')[0]);
    }

    searchBox() {
        return tableCells(this.searchField).map((item) => item.getElementsByTagName('input')[0]);
    }

    setupSearchListener() {
        this.searchBox()
            .forEach((search, index) =>
                search.addEventListener('keyup', (e) =>
                    this.find(e.target.value, index)));
    }

    items() {
        return tableRows(this.cache);
    }

    criteria(item) {
        let allSearches = this.searchBox()
            .filter((search) => search.value);

        return allSearches.length == 0 ||
            this.searchBox()
            .filter((search, index) =>
                search.value &&
                item.getElementsByTagName('td')[index].textContent.toLowerCase()
                    .includes(search.value.toLowerCase())
            )
            .length == allSearches.length;
    }

};

function tableCells(table, rowIndex = 0) {
    return [].slice.call(table.getElementsByTagName('tr')[rowIndex].getElementsByTagName('td'));
}

function tableRows(table) {
    return [].slice.call(table.getElementsByTagName('tbody')[0].getElementsByTagName('tr'));
}

function listItems(list) {
    return [].slice.call(list.getElementsByTagName('li'));
}

function createSearchTableFor(table) {
    let searchTable = document.createElement('table');
    let searchRow = document.createElement('tr');
    tableCells(table).forEach(function () {
        let searchColumn = document.createElement('td');
        searchColumn.appendChild(document.createElement('input'));
        searchRow.appendChild(searchColumn);
    });
    searchTable.appendChild(searchRow);

    return searchTable;
}


module.exports = Filter;