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

/*Promise.all([p1, p2, p3]).then((values) => {
  console.log(values); // [3, 1337, "foo"]
});
checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });
*/
  methods: {
    // Funzione che gestisce la ricerca. Viene chiamata quando si preme il pulsante "Cerca".
    handleSearch(searchText) {
      console.log("cerca");
      // Stampa a console un messaggio di debug.
      console.log("ricerca ricevuta in handleSearch:", searchText);
      // messaggio di debug.

      console.log("Search Text:", this.store.searchText);
      // Imposta lo stato di caricamento a true per indicare che la richiesta è in corso.
      this.store.loading = true;

      const movieApiUrl = `${this.store.baseApiUrl}${this.store.movieSearch}api_key=${this.store.api_key}&query=${searchText}`;
      const tvApiUrl = `${this.store.baseApiUrl}${this.store.tvSearch}api_key=${this.store.api_key}&query=${searchText}`;
      
      // richiesta parallela x movies e TV shows
      Promise.all([axios.get(movieApiUrl), axios.get(tvApiUrl)])
        .then(([movieResp, tvResp]) => {
          // aggiorna lista 
          this.store.movies = movieResp.data.results;
          this.store.tvShows = tvResp.data.results;
          console.log(movieResp.data.results, tvResp.data.results);
          this.store.loading = false;
        })
        
          
      
    },
  },

}

</script>

<template>
  
  <div class="container">
  
    <AppHeader @search="handleSearch"/>
    <h2 v-if="store.movies.length > 0">movies</h2>
    <div class="row">
      <AppContent :items="store.movies" :mediaType="'movie'" />
    </div>
    <h2 v-if="store.tvShows.length > 0">Tv shows</h2>
    <div class="row">
      <AppContent :items="store.tvShows" :mediaType="'tv'"  />
    </div>
  </div>


    
</template>

<style lang="scss" scoped>
@use "./style/general.scss";

h2 {
  color: red;
  text-align: center;
  padding: 0.5rem;
}


</style>
