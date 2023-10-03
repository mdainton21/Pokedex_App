/* eslint-env jquery */
// IIFE wrapping
let pokemonRepository = (function () {
    let pokemonList = [];

    // setup API fetches for each Gen of pokemon
    let apiUrl = [
        { url: "https://pokeapi.co/api/v2/pokemon/?limit=151", gen: "1", offset: 0 },
        { url: "https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100", gen: "2", offset: 151 },
        { url: "https://pokeapi.co/api/v2/pokemon/?offset=251&limit=135", gen: "3", offset: 251 },
        { url: "https://pokeapi.co/api/v2/pokemon/?offset=386&limit=107", gen: "4", offset: 386 },
        { url: "https://pokeapi.co/api/v2/pokemon/?offset=493&limit=156", gen: "5", offset: 493 },
        { url: "https://pokeapi.co/api/v2/pokemon/?offset=649&limit=72", gen: "6", offset: 649 },
        { url: "https://pokeapi.co/api/v2/pokemon/?offset=721&limit=88", gen: "7", offset: 721 },
        { url: "https://pokeapi.co/api/v2/pokemon/?offset=809&limit=96", gen: "8", offset: 809 },
        { url: "https://pokeapi.co/api/v2/pokemon/?offset=905&limit=105", gen: "9", offset: 905 }
    ];

    // reset previous data
    let currentApi = apiUrl[0];

    function changeApi(item) {
        pokemonList = [];
        currentApi = apiUrl[item];
        document.getElementById("pokemonUl").innerHTML = "";

        loadList().then(function () {
            getAll().forEach(function (pokemon) {
                addListItem(pokemon);
            });
        });

    }

    // Adding click function to navbar items
    $(".navbar-brand").click(function () {
        changeApi(0);
    });
    $("#id1").click(function () {
        changeApi(0);
    });
    $("#id2").click(function () {
        changeApi(1);
    }); 
    $("#id3").click(function () {
        changeApi(2);
    }); 
    $("#id4").click(function () {
        changeApi(3);
    }); 
    $("#id5").click(function () {
        changeApi(4);
    }); 
    $("#id6").click(function () {
        changeApi(5);
    }); 
    $("#id7").click(function () {
        changeApi(6);
    });
    $( "#id8" ).click(function() {
        changeApi(7);
    });
    $( "#id9" ).click(function() {
        changeApi(8);
    });


    function add(pokemon) {
        // data check before push
        if (
            typeof pokemon === "object" &&
            "name" in pokemon

        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon data error");
        }
    }
    function getAll() {
        return pokemonList;
    }

    // Function to add Pokemon as List items
    function addListItem(pokemon) {
        let pokemonQuery = document.querySelector(".pokemon-list");
        let pokemonItem = document.createElement("li");
        pokemonItem.classList.add("list-group-item");
        let spriteElement = document.createElement("img");
        spriteElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
        spriteElement.classList.add("poke-sprite");
        let button = document.createElement("button");
        button.style.background = spriteElement;
        button.innerText = pokemon.id + ". " + pokemon.name;
        button.classList.add("button-class");
        button.type = "button"
        button.classList.add("btn");
        button.setAttribute("data-bs-target", "#modal-container"); 
        button.setAttribute("data-bs-toggle", "modal");
        button.addEventListener ("click", () => {
            loadDetails(pokemon).then(function() {
                showModal(pokemon);
        })});



        //Appends
        button.appendChild(spriteElement);
        pokemonItem.appendChild(button);
        pokemonQuery.appendChild(pokemonItem);
    }

    // Function to fetch PokeAPI and save to list
    function loadList() {
        return fetch(currentApi.url).then(function (response) {
            return response.json();
        }).then(function (json) {
            let pokeId = currentApi.offset + 1;
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                    id: pokeId
                };
                add(pokemon);
                pokeId = pokeId + 1
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Load specific details for each pokemon

            //Images
            item.imageUrl = details.sprites.other["official-artwork"].front_default;
            item.spriteUrl = details.sprites.front_default;

            //Other Details
            item.id = details.id;

            item.height = details.height;
            item.weight = details.weight;
            item.types = [];
            // Set types to an array that can vary depending on amount of types a pokemon has
            for (var i = 0; i < details.types.length; i++) {
                item.types.push(details.types[i].type.name);
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Modal setup
    function showModal (pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        modalTitle.empty();
        modalBody.empty();

        let titleElement = document.createElement("h1");
        titleElement.innerText = pokemon.name;
        titleElement.classList.add("modal-title");

        // Creating Img element that shows pokemon image
        let imageElement = document.createElement("img");
        imageElement.src = pokemon.imageUrl;
        imageElement.classList.add("modal-pic");

        let heightElement = document.createElement("p");
        heightElement.innerText =  "Height: " + `${pokemon.height / 10} m\n`

        let weightElement = document.createElement("p");
        weightElement.innerText =  "Weight: " + `${pokemon.weight / 10} kg\n`

        let typeElement = document.createElement("p");
        if (pokemon.types.length > 1) {
            typeElement.innerText = "Types: " + `${pokemon.types[0]}` + ", " + `${pokemon.types[1]}`;
        } else {
            typeElement.innerText = "Type: " + `${pokemon.types[0]}`;
        }
        typeElement.classList.add("modal-type");

        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typeElement);
      
    }

    // return all functions created in IIFE wrapping
    return {
        showModal:showModal,
        changeApi: changeApi,
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();


// Calling List function
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
