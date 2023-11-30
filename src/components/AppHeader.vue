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

    <header>

   
    
        <div class="logo">
            <h1> BoolFlix </h1>
        </div>
        <div class="search-bar">
            <!-- Input legato a testo di ricerca. -->
            <input v-model="searchText" placeholder="Cerca film..."/>
            
            <!-- gestore di eventi click collegato alla funzione search -->
            <button @click="search"> Cerca </button>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    padding: 1rem;
    h1{
        color: red;
    }
}
   
</style>
