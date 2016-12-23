let AppFilter = require('./Filter.js');
let Faker = require('./faker.js');

const app = new Vue({
    el: '#app',
    data : {
        reports : []
    },
    methods : {
    }
});

Faker.json().then(function (response) {
    app.reports = response;

    Vue.nextTick(function () {
        AppFilter.setup({
            target : '#items-list'
        });

        AppFilter.setup({
            target : '#items-table'
        });
    });
});