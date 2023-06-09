<template>
<!-- Afficher carte si la data est chargée -->
    <div class="mainContainer" v-if="itemsLoaded">
        <div class="mainImageContainer">
            <img :src="currentImage"/>
            <!-- Appelle la fonction changePokemonSprite quand on utilise le select -->
            <select class="pokemonSelect" name="pokemonSpriteChoice" @change="changePokemonSprite($event)">
            <!-- Ajout d'une option pour chaque image enregistrée dans pokemonSprites -->
                <option v-for="sprite in pokemonSprites" :value="sprite.name" >{{ firstLetterUppercase(removeUnderScores(sprite.name)) }}</option>
            </select>
        </div>
        <div class="nameContainer">
            <!-- met la première lettre du nom du pokémon en majuscule et affiche son ID -->
            <h1>{{ firstLetterUppercase(pokemon.name) }} - N.{{ pokemon.id }}</h1>
        </div>
        <div class="mainInfosContainer">
            <div class="mainInfoItem">
                <!-- Affiche le poids du pokémon en KG -->
                Weight: {{ pokemon.weight/10 }}kg
            </div>
            <div class="mainInfoItem">
                <!-- Affiche la taille du pokémon en m -->
                Height: {{ pokemon.height/10 }}m
            </div>
        </div>
        <div class="statsContainer"  style="overflow-x: hidden; margin-top: 10px;">
            <!-- Affiche toutes les stats du pokémon avec le nom en majuscule -->
            <div class="stat" v-for="stat in pokemon.stats" style="">
                <div class="statBar"  style="float:left;margin-left:auto;margin-right:auto;">
                    {{ stat.base_stat }} {{ firstLetterUppercase(stat.stat.name) }} <br>
                    <!-- Valeur de la stat définie par l'objet JSON -->
                    <progress :value="stat.base_stat" max="300"></progress>
                </div>
            </div>
        </div>
        <div class="typesContainer">
            <!-- Affichage de tous les types du pokémon -->
            <div class="type" v-for="pokemonType in pokemon.types">
                {{ pokemonType.type.name }}
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
    data() {
        return {
            pokemon: {},
            pokemonStats: [],
            pokemonSprites: [],
            currentSprite: '',
            itemsLoaded: false,
            currentImage: "",
        };
    },
    props: {
        // ID passé en paramètre
        id: String,
    },
    // async pour attendre le chargement de la data
    async mounted(){
        // Cherche le pokémon dans le store
        this.pokemon = this.$store.getters.getPokemonByIndex(this.id);
        // Si le pokémon n'est pas dans le store, on le cherche dans l'API, s'il est toujours introuvable, on renvoie l'utilisateur sur la page d'erreur dans un try catch
        if(this.pokemon == null){
            try {
                let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
                this.pokemon = res.data;
            } catch {
                this.$router.push({name: `ErrorPage`});
            }            
        }
        // Image affichée par défaut
        let pokemonImage = this.pokemon.sprites.other["official-artwork"]["front_default"];
        let defaultPokemonImageObject = {
            name: 'default',
            url: pokemonImage
        }
        // Ajout de l'image dans la liste des options d'image a choisir
        this.pokemonSprites.push(defaultPokemonImageObject);
        this.currentSprite = 'default';
        this.currentImage = pokemonImage;
        this.itemsLoaded = true;
        // Ajout de toutes les stats dans la liste des stats
        for(let i = 0; i < this.pokemon.stats.length; i++){
            this.pokemonStats.push(this.pokemon.stats[i]);
        }
        // Ajout des autres sprites dans la liste de sprite
        for(const sprite in this.pokemon.sprites){
            if(this.pokemon.sprites[sprite] != null){
                if(sprite != 'other' && sprite != 'versions'){
                    let spriteObject = {
                        name: sprite,
                        url: this.pokemon.sprites[sprite],
                    };
                    this.pokemonSprites.push(spriteObject);
                }
            }
        }
        for(const sprite in this.pokemon.sprites.other.home){
            if(this.pokemon.sprites.other.home[sprite] != null){
                let spriteObject = {
                    name: `home_${sprite}`,
                    url: this.pokemon.sprites.other.home[sprite],
                }
                this.pokemonSprites.push(spriteObject);
            }
        }
    },
    methods: {
        // Renvoie un texte avec la première lettre en majuscule
        firstLetterUppercase(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        // Supprime tous les underscores d'un texte
        removeUnderScores(string){
            return string.replaceAll('_', ' ');
        },
        // Change l'image affichée du pokémon
        changePokemonSprite(event){
            let spriteName = event.target.value;
            this.pokemonSprites.forEach(sprite => {
                if(sprite.name === spriteName){
                    this.currentSprite = sprite.name;
                    this.currentImage = sprite.url;
                }
            });
        },
    },
}
</script>

<style>
    .mainContainer {
        overflow-y: auto;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        min-width: 250px;
        max-width: 1100px;

        background: rgba( 255, 255, 255, 0.15 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 5px );
        -webkit-backdrop-filter: blur( 5px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    }
    .mainImageContainer {
        display: block;
        border-right: 1px solid rgba( 255, 255, 255, 0.18 );
        width: 30%;
        min-width: 250px;
        float: left;
        /* border: 2px solid white; */
    }
    img {
        object-fit: cover;
        width: 100%;
    }
    .nameContainer {
        margin-top: 5px;
        padding-bottom: 5px;
        overflow: hidden;
        text-align: center;
        font-family: 'Ubuntu', sans-serif;
        font-size: 25px;
        border-bottom: 1px solid rgba( 255, 255, 255, 0.18 );
    }
    .mainInfosContainer {
        padding: 10px;
        overflow: hidden;
        font-family: 'Ubuntu', sans-serif;
    }
    .mainInfoItem {
        width: 50%;
        float: left;
        text-align: center;
    }
    .stat {
        overflow: hidden;
        width: 50%;
        float: left;
        display: flex;
    }
    progress {
        box-sizing: 5px;
    }
    progress::-webkit-progress-bar {
        background-color: #595150;
        border-radius: 5px;
    }
    progress::-webkit-progress-value {
        background-color: green;
        border-radius: 5px;
    }
    .pokemonSelect {
        width: 100%;
        color: black;
    }
    .typesContainer {
        margin-top: 5px;
        margin-bottom: 5px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .type {
        float: left;
        margin-left: 5px;
        margin-right: 5px;
        width: 80px;
        background-image: linear-gradient(to right bottom, #540389, #93007b, #c10061, #de0042, #eb1818);
        text-align: center;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 5px;
    }
</style>
