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
            <td>{{ email.scheduled }}</td>
            <td>{{ email.sent }}</td>
            <td>{{ email.unique_opened }}</td>
            <td>{{ email.downloaded }}</td>
    </tr>
    </tbody>
</table>`
});

const app = new Vue({
    el: '#app',
    data : {
        latestEmails : [{
            title : 'Oil - Data review / Europe Oil data',
            scheduled : '700',
            sent : '699',
            unique_opened : '688',
            downloaded : '61'
        }]
    }
});