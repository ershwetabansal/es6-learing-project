class Filter {

    constructor(options) {
        if (new.target === "Filter") {
            throw new Error("This class cannot be instantiated directly");
        }

        this.target = options.target;
        this.search = document.createElement('input');
    }

    static setup(options) {
        if (!options.target) {
            throw new Error("Target should be present");
        }

        let target = document.querySelector(options.target);

        if (target.tagName == 'UL') {
            options.target = target;
            return new ListFilter(options);
        }

        if (target.tagName == 'TABLE') {
            options.target = target;
            return new TableFilter(options);
        }
    }

    searchBox() {
        return this.search;
    }
}

class ListFilter extends Filter {

    constructor(options) {
        super(options);
        document.body.insertBefore(this.search, this.target);
    }

}

class TableFilter extends Filter {
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
}

module.exports = Filter;