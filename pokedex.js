var vuePokemon = new Vue({
    el: '#pokedex',
    mounted: function() {
        fetch("data.json")
            .then(response => response.json())
            .then(json => {
                this.selectPokemon(json[0]);
                this.pokemonList = json;
            });
    },
    data: {
        pokemonList: [],
        selectedPokemon: null,
        search: ''
    },
    methods: {
        getCardColor(poke) {
            return 'b-' + poke.typeofpokemon[0].toLocaleLowerCase();
        },
        selectPokemon(poke) {
            this.selectedPokemon = poke;
        },
        getEvolution: function() {

        }
    },
    computed: {
        filterPokemon: function() {
            let _search = this.search.toLocaleLowerCase();
            return this.pokemonList.filter(
                (poke) => poke.name.toLocaleLowerCase().includes(_search)
            );
        },
        chainEvolution: function() {
            let chainEvolution = [];
            let evolutions = [];

            // Obtener los Pokémon
            this.selectedPokemon.evolutions.forEach(evolutionId => {
                let evolutionPokemon = this.pokemonList.filter(pokemon => pokemon.id == evolutionId)[0];
                if (evolutionPokemon)
                    evolutions.push(evolutionPokemon);
            });
            

            for (let index = 0; index < evolutions.length - 1; index++) {
                let chain = {
                    current: evolutions.filter(evolution => evolution.id == evolutions[index + 1].evolvedfrom)[0],
                    next: evolutions[index + 1]
                }   
                chainEvolution.push(chain);
            }

            return chainEvolution;
        }
    }
})