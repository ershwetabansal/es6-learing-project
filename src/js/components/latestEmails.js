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