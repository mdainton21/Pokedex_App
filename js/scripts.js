// IIFE wrapping
let pokemonRepository = (function () {
    let Repository = [
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

    function getAll() {
        return Repository;
    }
    function add(pokemon) {
        Repository.push(pokemon);
    }

    // Function to add Pokemon as List items
    function addListItem(pokemon) {
        let pokemonQuery = document.querySelector(".pokemon-list");
        let pokemonItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");

        // Add event listener to call details function whenever a button is clicked
        button.addEventListener('click', function (pokemonClick) {
            pokemonRepository.showDetails(pokemon);
        });

        //Appends
        pokemonItem.appendChild(button);
        pokemonQuery.appendChild(pokemonItem);
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    // return all functions created in IIFE wrapping
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

// IIFE check
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Blastoise' });

// Calling List function
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});