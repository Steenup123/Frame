<template>
  <div class="pokemons_container">
      <!-- Ajoute une carte pokémon pour chaque pokémon présent dans le store + passe sa donnée au composant enfant -->
    <div v-for="pokemon in pokemons">
        <PokemonCard :pokemonData="pokemon" v-if="pokemon != undefined"/>
    </div>
  </div>
</template>

<script>
// Importation de axios et PokemonCard
import axios from 'axios'
import PokemonCard from './components/PokemonCard.vue'
export default {
    computed: {
        pokemons(){
            // Recupere la liste des pokémons dans le store
            return this.$store.getters.getAllPokemons;
        },
    },
    mounted() {
        if(this.$store.getters.getAllPokemons.length) return;
        // Récupère la liste des pokémons par l'api (sauf si la liste n'est pas vide car ils sont déjà présents dans le store)
        axios.get("https://pokeapi.co/api/v2/pokemon")
            .then((result) => {
                let resPokemons = result.data.results;
                let nextApiCall = result.data.next;
                for(let i = 0; i < resPokemons.length; i++){
                    // Ajout du prochain call API a faire et des pokémons dans le store
                    this.$store.commit('addPokemon', resPokemons[i]);
                    this.$store.commit('setHomepageMainApiNextCall', nextApiCall);
                }
            });
            this.getNextPokemons();
    },
    methods: {
        getNextPokemons(){
            // Watcher qui vérifie quand on scroll sur la page (async car on attendra pour la réponse de l'API)
            window.onscroll = async () => {
                // Vérifie si on est en bas de la page
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if(bottomOfWindow){
                    // Si le prochain call API n'est pas undefined
                    if(this.$store.getters.getNextHomepageApiCall != undefined){
                        // Récupération des pokémons par l'api
                        let res = await axios.get(this.$store.getters.getNextHomepageApiCall);
                        // Vérifie le résultat est null
                        if(res != undefined && res != null){
                            let resPokemons = res.data.results;
                            let nextApiCall = res.data.next;
                            // Ajout des pokémons dans le store
                            for(let i = 0; i < resPokemons.length; i++){
                                this.$store.commit("addPokemon", resPokemons[i]);
                            }
                            // assignation du prochain call API dans le store
                            this.$store.commit('setHomepageMainApiNextCall', nextApiCall);
                        }
                    }
                } 
            }
        }
    },
    components: { PokemonCard }
}
</script>

<style>
    .pokemons_container {
        display: flex;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 50px;
    }
</style>