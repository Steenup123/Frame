<template>
    <div class="errorZone">
        <h1>Page not found :(</h1><div class="sep"></div>
        <p>You have reached the boundaries of the internet. It is not safe here.</p><div class="sep"></div>
        <!-- appeler la fonction backToHomePage lorsqu'on clique sur la balise <a> -->
        <p>It's a dangerous place here. <a class="homePageLink" @click="backToHomePage">Let's get back to home page</a> </p>
    </div>
</template>

<script>
export default {
    methods: {
        backToHomePage(){
            // Renvoie l'utilisateur sur la home page
            this.$router.push({
                path: `/`
            });
        }
    },
}
</script>

<style>
.errorZone {
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.sep {
    width: 100%;
    height: 0px;
}
.homePageLink {
    cursor: pointer;
    text-decoration: underline;
}
.homePageLink:hover {
    color: black;
    background-color: lightgreen;
    text-decoration: none;
}
</style>