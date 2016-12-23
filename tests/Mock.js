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
    },
    {
        title : 'Shantaram',
        author : 'Gregory David Roberts',
        description : 'Sed ut perspiciatis unde omnis iste natus error sit'
    },
    {
        title : 'The mountain shadow',
        author : 'Gregory David Roberts',
        description : 'Sed ut perspiciatis unde omnis iste natus error sit'
    },
    {
        title : 'Fountain Head',
        author : 'Ayn Rand',
        description : 'Sed ut perspiciatis unde omnis iste natus error sit'
    },
    {
        title : 'Kite runner',
        author : 'Khaled Hosseini',
        description : 'Sed ut perspiciatis unde omnis iste natus error sit'
    },
    {
        title : 'A thousand Splendid suns',
        author : 'Khaled Hosseini',
        description : 'Sed ut perspiciatis unde omnis iste natus error sit'
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


function getTable(array, props) {
    let table = document.createElement('table');
    let body = document.createElement('tbody');
    array.forEach(function (item) {
        let row = document.createElement('tr');

        props.forEach(function(prop) {
           let cell = document.createElement('td');
            cell.innerText = item[prop];
            row.appendChild(cell);
        });
        body.appendChild(row);
    });
    table.appendChild(body);
    table.setAttribute('id', 'table');
    return table;
}

function getList(array, prop) {
    let list = document.createElement('ul');
    array.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.innerText = (prop) ? item[prop] : item;
        list.appendChild(listItem);
    });
    list.setAttribute('id', 'list');
    return list;
}

module.exports = {
    books : books,
    images : images,
    table : getTable,
    list : getList
};