<script>
export default {
    // Dichiara gli eventi emessi dal componente, "search".
    emits: ['search'],
    
    
    data() {
        return {
            // test di ricerca inizializzato come stringa vuota
            searchText: "",
        };
    },

    methods: {
        //  quando viene premuto il pulsante di ricerca
        search() {
            //  testo di ricerca nel componente AppHeader.
            console.log("Search Text in AppHeader:", this.searchText); 
          
            // emette l'evento "search" con il testo di ricerca come argomento.
            this.$emit("search", this.searchText);
        }
    }
}
</script>

<template>
    
    <div class="logo">
        logo here
    </div>
    <div class="search-bar">
        <!-- Input legato a testo di ricerca. -->
        <input v-model="searchText" placeholder="Cerca film..."/>
        
        <!-- gestore di eventi click collegato alla funzione search -->
        <button @click="search"> Cerca </button>
    </div>
</template>

<style scoped>
   
</style>
