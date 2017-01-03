import Carousel from './Carousel.js';

var template = `
<div style="font-weight: bold;">{{ title }}</div>
<div>{{ description }}</div>
`;
var carousel = Carousel.setup({
    target : '#carousel',
    template : template,
    interval : 4000,
    prev : '#prev',
    next : '#next',
    source : [
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
    ]
});
