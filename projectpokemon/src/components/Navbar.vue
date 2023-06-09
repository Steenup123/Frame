<template>

<nav class="navbar navbar-light navbar-expand-sm bg-light">
  <div class="container-fluid">
    <a class="navbar-brand me-2" @click="loadHomePage">
      <img
        src="https://www.nicepng.com/png/full/12-124701_pokeball-png.png"
        height="16"
        alt="pokemon logo"
        loading="lazy"
        id="navbarLogo"
      />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" @click="loadHomePage">Pokémons</a>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled" href="#">Items</a>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled" href="#">Machines</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>
    import { defineComponent } from "vue";

    export default defineComponent({
        methods: {
          loadHomePage(){
            // Remet l'utilisateur sur la page d'accueil
            this.$router.push({
                path: `/`
            });
          }
        }
    });
</script>

<style>
    #navbarLogo {
        margin-top: -1px;
        width: 30px;
        cursor: pointer;
    }
</style>