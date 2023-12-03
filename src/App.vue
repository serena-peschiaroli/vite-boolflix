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

      const movieApiUrl = `${this.store.baseApiUrl}${this.store.movieSearch}${this.store.api_key}&query=${searchText}`;
      const tvApiUrl = `${this.store.baseApiUrl}${this.store.tvSearch}${this.store.api_key}&query=${searchText}`;
      console.log(movieApiUrl, tvApiUrl);
      
      // richiesta parallela x movies e TV shows
      Promise.all([axios.get(movieApiUrl), axios.get(tvApiUrl)])
        .then(([movieResp, tvResp]) => {
          // aggiorna lista 
          this.store.movies = movieResp.data.results;
          this.store.tvShows = tvResp.data.results;
          console.log(movieResp.data.results, tvResp.data.results);
          this.store.movies.id= movieResp.data.results[0].id;
          console.log(this.store.movies.id);
          this.store.tvShows.id = tvResp.data.results[0].id;
          console.log(this.store.tvShows.id);
          this.store.loading = false;


        });
        
          
      
      },
      handleShowMore() {
        const mediaType = 'movie' ? 'movie' : 'tv';
        console.log('mediaType', mediaType)
        const selectedItem = this.store[mediatype + 's'][0].id;

        if (selectedItem && selectedItem.id) {
          this.store.apiId = selectedItem.id;
          const idApiUrl = `${this.store.baseApiUrlById}${mediaType}/${this.store.apiId}?${this.store.api_key}${credits} `;

          this.store.loading=true;

          axios.get(idApiUrl)
          .then((apiIdResp) => {
            this.store.results = apiIdResp.data;
            console.log('Data prop:', apiIdResp.data);
          })
        }else{
          console.log('invalido o id non trovato!')
        }

        // this.store.apiId = this.store.movies[0].id;
        // console.log(this.store.apiId)
        
        
        
        // const idApiUrl = `${this.store.baseApiUrlById}movie/${this.store.apiId}?${this.store.api_key}`;
        // console.log(idApiUrl)

        // // Imposta lo stato di caricamento a true per indicare che la richiesta è in corso.
        // this.store.loading = true;

        // // Richiesta per i dettagli aggiuntivi basati sull'ID
        //  axios.get(idApiUrl)
        //   .then((apiIdResp) => {
        //     // Aggiorna la lista dei risultati con i dettagli aggiuntivi
        //    this.store.results = apiIdResp.data;
          

        //     // Log the structure of the data property
        //     console.log('Data Property:', apiIdResp.data);
        //     this.store.loading = false;
          
        //   })
         

      }

  },

}

</script>

<template>
  
  <div class="container">
  
    <AppHeader @search="handleSearch"/>
    <h2 v-if="store.movies.length > 0">movies</h2>
    <div v-if="store.movies.length > 0" class="row">
      <AppContent :items="store.movies" :mediaType="'movie'" @showMore="handleShowMore"  />
    </div>
    <h2 v-if="store.tvShows.length > 0">Tv shows</h2>
    <div v-if="store.tvShows.length > 0" class="row">
      <AppContent :items="store.tvShows" :mediaType="'tv'" @showMore="handleShowMore" />
      
    </div>
  </div>


    
</template>

<style lang="scss" scoped>
@use "./style/general.scss";
@import "@fortawesome/fontawesome-free/css/all.css";

h2 {
  color: red;
  text-align: center;
  padding: 0.5rem;
}


</style>
