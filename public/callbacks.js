// TODO: Figure out if this is what I want to do to structure the project.
class Pokemon {
    constructor(id, name, lvl, sprites) {
        this.id = id;
        this.name = name;
        this.lvl = lvl;
        this.sprites = sprites;
    }
}

async function getPokemon (pokemonID, isShiny) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`).then(response => {
        const {name, sprites} = response.data;
        
        // Used to track the last Pokemon.
        lastPokemon = [pokemonID, isShiny];

        clearList();

        let frontImg = sprites.front_default;
        let shinyFrontImg = sprites.front_shiny;
        let newElement = document.createElement('img');

        let nameElement = document.createElement('h3');
        nameElement.innerText = name.toUpperCase();
        nameElement.setAttribute('style', `text-align: center;`)
        newElement.setAttribute("title", name);

        newElement.setAttribute("src", isShiny? shinyFrontImg : frontImg);

        pokemonSpriteArea.appendChild(nameElement);
        pokemonSpriteArea.appendChild(newElement);
    })
}

async function getPokemonFromAPI (id) {
    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
        const {name, sprites} = response.data;

        // Deconstruck the sprites
        const {back_default, back_female, back_shiny, back_shiny_female, front_default} = sprites

        pokemon = new Pokemon(id, name, 10, sprites);
        return pokemon;
    })
}