const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value.toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${ pokeName }`;

    const $pokemonName = document.getElementById("pokename-title");

    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./assets/pokemon-sad.jpg");
            changeTitleName($pokemonName, "Pokemon not found!");
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;

            changeTitleName($pokemonName, `#${ data.id.toString()} - ${ data.name }`);
            pokeImage(pokeImg);
            getStats(data);
            getPokemonTypes(data);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const changeTitleName = (pokemonNameTitle, name) =>  pokemonNameTitle = pokemonNameTitle.innerHTML = name;

const getStats = (response) => {

    const $stats = document.getElementsByClassName("stat");
    let counter = 0;

    Array.from($stats).forEach( (stat) => {
        stat.innerHTML = response.stats[counter].base_stat.toString();
        counter++;
    });
}

const getPokemonTypes = (response) => {

    const pokemonTypesResponse = response.types;
    const $pokemonTypes = document.getElementsByClassName("type");
    let counter = 0;

    if(pokemonTypesResponse.length === 1 ){

        let pokeClase = pokemonTypesResponse[counter].type.name;

        $pokemonTypes[0].innerHTML = pokeClase;

        if($pokemonTypes[0].classList.length > 1){

            let oldStyles = $pokemonTypes[0].classList;
            oldStyles.replace(oldStyles[1], pokeClase);
        }

        $pokemonTypes[0].classList.add(pokeClase);
        $pokemonTypes[1].innerHTML = '';
        $pokemonTypes[1].classList.add("none");

    } else{
        Array.from($pokemonTypes).forEach( ($type) => {

            let pokeClase = pokemonTypesResponse[counter].type.name;

            $type.innerHTML = pokeClase;

            if($type.classList.length > 1){

                let oldStyles = $type.classList;
                oldStyles.remove("none");
                oldStyles.replace(oldStyles[1], pokeClase)
            }

            $type.classList.add(pokeClase);
            counter++;
        });
    }
}