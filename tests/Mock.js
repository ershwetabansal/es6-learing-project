let books = [
    {
        title : 'Assassin Of History',
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'
    },
    {
        title : 'Spy Without A Goal',
        description : 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.'
    },
    {
        title : 'Defenders Of The North',
        description : 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit .'
    },
    {
        title : 'Snakes Without Hate',
        description : 'molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur'
    }
];

let images = [
    {
        source : 'http://example.com/dog.png',
        name : 'Dog'
    },
    {
        source : 'http://example.com/cat.png',
        name : 'Cat'
    },
    {
        source : 'http://example.com/snake.png',
        name : 'Snake'
    },
    {
        source : 'http://example.com/monkey.png',
        name : 'Monkey'
    }
];

let table = `
<table id="table">
    <thead></thead>
    <tbody>
        <tr>
            <td>Shantaram</td>
            <td>Gregory David Roberts</td>
        </tr>
        <tr>
            <td>Shantaram</td>
            <td>Gregory David Roberts</td>
        </tr>
        <tr>
            <td>The mountain shadow</td>
            <td>Gregory David Roberts</td>
        </tr>
         <tr>
            <td>Fountain Head</td>
            <td>Ayn Rand</td>
        </tr>
         <tr>
            <td>Kite runner</td>
            <td>Khaled Hosseini</td>
        </tr>
        <tr>
            <td>A thousand Splendid suns</td>
            <td>Khaled Hosseini</td>
        </tr>
    </tbody>
</table>
`;

let list = `
<ul id="list">
    <li>
        Assassin Of History
    </li>
    <li>
        Assassin Quest
    </li>
    <li>
        Defenders Of The North
    </li>
    <li>
        Snakes Without Hate
    </li>
</ul>`;

module.exports = {
    books : books,
    images : images,
    table : table,
    list : list
};