Vue.component('latest-emails', {
    props: ['emails'],
    template: `
<table class="table">
    <thead>
    <tr>
        <th>Title</th>
        <th>Scheduled</th>
        <th>Sent</th>
        <th>Unique opened</th>
        <th>Downloads</th>
    </tr>
    </thead>
    <tbody>
        <tr v-for="email in emails">
            <td>{{ email.title }}</td>
            <td>{{ email.scheduled || 0 }}</td>
            <td>{{ email.sent || 0 }}</td>
            <td>{{ email.unique_opened  || 0 }}</td>
            <td>{{ email.downloaded || 0 }}</td>
    </tr>
    </tbody>
</table>`
});

let latestEmails = [{
    title : 'report',
    scheduled : '123',
    sent : '123',
    unique_opened : '89',
    downloaded : '7'
}];

const app = new Vue({
    el: '#app',
    data : {
        latestEmails : latestEmails
    },
    methods : {
        stopAutoUpdate : function () {
            clearInterval(interval);
        },
        startAutoUpdate : function () {
            interval = setInterval(addReport, 2000);
        }
    }

});
let x = 1;
let interval = setInterval(addReport, 2000);

function addReport() {
    app.latestEmails = app.latestEmails.filter((x, index) =>  (index >= app.latestEmails.length - 7));
    app.latestEmails.push({title : 'report .. ' + (x++)});
}
