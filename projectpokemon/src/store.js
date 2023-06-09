import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            pokemons: [],
            pokemonsCompleteData: [],
            homepageMainApiNextCall: "",
        }
    },
    getters: {
        getAllPokemons: (state) => state.pokemons,
        // Retourne un pokémon par son index passé en paramètre
        getPokemonByIndex: (state) => (index) => {
            return state.pokemons[index-1];
        },
        checkIfDataComplete: (state) => (index) => {
            return state.pokemonsCompleteData[index-1];
        },
        getNextHomepageApiCall: (state) => state.homepageMainApiNextCall,
    },
    mutations: {
        // Ajout d'un pokémon dans la liste
        addPokemon(state, pokemon){
            state.pokemons.push(pokemon);
            state.pokemonsCompleteData.push(false);
        },
        // Remplacer data incomplete par data complete
        setPokemon(state, pokemonData){
            let id = parseInt(pokemonData.id) - 1;
            state.pokemons[id] = pokemonData;
            state.pokemonsCompleteData[id] = true;
        },
        // Assignement de l'url du prochain call API à la variable
        setHomepageMainApiNextCall(state, url){
            state.homepageMainApiNextCall = url;
        }
    }
});

export default store;