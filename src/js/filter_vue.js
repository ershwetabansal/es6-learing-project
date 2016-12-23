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
});