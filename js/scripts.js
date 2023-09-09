let pokemonlist = [];
pokemonlist = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        weight: 6.9,
        type: ['grass', 'poison'],
    },
    {
        name: 'Ivysaur',
        height: 1,
        weight: 13,
        type: ['grass', 'poison'],
    },
    {
        name: 'Charmander',
        height: 0.6,
        weight: 8.5,
        type: ['fire'],
    },
    {
        name: 'Charmeleon',
        height: 1.1,
        weight: 19,
        type: ['fire'],
    },
    {
        name: 'Squirtle',
        height: 0.5,
        weight: 9,
        type: ['water'],
    },
    {
        name: 'Wartortle',
        height: 1,
        weight: 22.5,
        type: ['water'],
    }
]

// Loop to print pokemon name/height
pokemonlist.forEach(function (item) {
    document.write(item.name);
    document.write(' (height: ' + item.height + 'm)');
    document.write(' (weight: ' + item.weight + 'kg)');
    // Conditional to check height and weight
    if (item.height > 1) {
        document.write(' - That is pretty tall!');
    }
    else if (item.weight > 20) {
        document.write(' - That is quite heavy!')
    }
    document.write('<br><br>')
});