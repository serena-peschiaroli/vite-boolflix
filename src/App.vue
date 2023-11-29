<script >
import axios from "axios";
import { store } from "./store.js";
import AppHeader from "./components/AppHeader.vue";
import AppContent from "./components/AppContent.vue";

export default {
  data() {
    return {
      store,
    };
  },
  components: {
    AppHeader,
    AppContent,
    
},
  methods: {
     // Funzione che gestisce la ricerca. Viene chiamata quando si preme il pulsante "Cerca".
    handleSearch(searchText){
    console.log("cerca");
    // Stampa a console un messaggio di debug.
    console.log("ricerca ricevuta in handleSearch:", searchText); 
    //  messaggio di debug.

    console.log("Search Text:", this.store.searchText);
    // Imposta lo stato di caricamento a true per indicare che la richiesta è in corso.
    this.store.loading = true;
    this.store.loading=true;
    const apiUrl = `${this.store.baseApiUrl}api_key=${this.store.api_key}&query=${searchText}`;
    console.log(apiUrl);
    axios.get(apiUrl)
    .then((resp) => {
       // Una volta ricevuti i dati, aggiorna la lista di film
        this.store.movies = resp.data.results;
        console.log(resp.data.results);
        this.store.loading=false;
    });
  },
  }
}

</script>

<template>

  <AppHeader @search="handleSearch"/>
  <AppContent :movies="store.movies" />
  
  
    
</template>

<style scoped>

</style>
