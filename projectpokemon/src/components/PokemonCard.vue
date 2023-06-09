<template>
<!-- @click sert à appeler la fonction "chargerPageDetails()" -->
    <div class="pokemonCard" @click="chargerPageDetails">
        <div class="cardImageZone" >
            <!-- Affiche l'image si l'objet pokemon est chargé -->
            <img :src="pokemonImage" v-if="loaded"/>
            <!-- Module loading spinner avec couleur, taille, et durée de l'animation + condition d'affichage si la carte n'est pas chargée -->
            <fingerprint-spinner
              :animation-duration="1500"
              :size="64"
              color="#ee8329"
              v-if="loaded == false"
            />
        </div>
        <div class="nameZone">
            <p>{{ pokemonInfos.name }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { FingerprintSpinner } from 'epic-spinners'

export default {
    data() {
        // objet JSON avec les infos du pokémon + lien de l'image a afficher sur la carte + variable qui sert à déterminer si le JSON est chargé ou non
        return {
            pokemonInfos: {},
            pokemonImage: '',
            loaded: false,
        };
    },
    props: {
        // Info du pokémon à afficher envoyé par la page principale
        pokemonData: Object
    },
    // Executé lors du chargement du component (async car on attend le chargement de l'objet pokemon dans le code)
    async mounted() {
        // Récupération de l'id du pokémon (pour le lien de la page détails)
        let url = this.pokemonData.url;
        let lastSlashPosition = url.lastIndexOf('/');
        let id = parseInt(url.substring(lastSlashPosition+1));
        // Verifie si le pokémon est présent dans le store
        if(this.$store.getters.checkIfDataComplete(id)){
            this.pokemonInfos = this.$store.getters.getPokemonByIndex(id);
        } else {
            // Récupération du pokémon par l'api si ce dernier n'est pas dans le store + ajout dans le store de ce dernier (await pour attendre le chargement)
            let res = await axios.get(this.pokemonData.url);
            this.pokemonInfos = res.data;
            this.pokemonInfos.url = url;
            this.$store.commit("setPokemon", res.data);
        }
        // Indique au code le lien de l'image à afficher + indique que le chargement est effectué
        this.pokemonImage = this.pokemonInfos.sprites.other["official-artwork"]["front_default"];
        this.loaded = true;
    },

    methods: {
        chargerPageDetails(){
            if(this.loaded){
                // Envoie l'utilisateur sur la page détails du pokémon correspondant à la carte affichée
                this.$router.push({
                path: `/pokemon/${this.pokemonInfos.id}`
            });
            }
        }
    },
    // Loading spinner
    components: {
        FingerprintSpinner
    }
}
</script>
<style>
    .pokemonCard {
    /* background-color: white; */

        height: 350px;
        width: 300px;
        border-radius: 15px;

        
        margin-top: 50px;
        overflow: hidden;

        float: left;
        margin-left: 15px;
        margin-right: 15px;

        /* border: 1px solid gainsboro; */
        transition-duration: 150ms;

        background: rgba( 255, 255, 255, 0.15 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 5px );
        -webkit-backdrop-filter: blur( 5px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    }
    .pokemonCard:hover {
            transform: translateY(-20px) scale(1.05) ;
            transition-duration: 150ms;
            cursor: pointer;
    }
    .cardImageZone {
        display: flex;
        width: 100%;
        height: 80%;
        justify-content: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.18);
        align-items: center;
        overflow: hidden;
        /* background-color: #dbdbdb; */
    }
    .nameZone {
        display: flex;
        align-items: center;
        justify-content: center;
        /* color: black; */
        color: whitesmoke;
        height: 20%;
    }
</style>