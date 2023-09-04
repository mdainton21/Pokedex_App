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
for (let i = 0; i < pokemonlist.length; i++) {
    document.write(pokemonlist[i].name);
    document.write(' (height: ' + pokemonlist[i].height + 'm)');
    document.write(' (weight: ' + pokemonlist[i].weight + 'kg)');
    // Conditional to check height and weight
    if (pokemonlist[i].height > 1) {
        document.write(' - That is pretty tall!');
    } else if (pokemonlist[i].weight > 20) {
        document.write(' - That is quite heavy!')
    }
    document.write('<br><br>')
}