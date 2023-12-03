<script >
import axios from "axios";
import { store } from "./store.js";
import AppHeader from "./components/AppHeader.vue";
import AppContent from "./components/AppContent.vue";


export default {
  data() {
    return {
      store,
      allItemsId: {
        moviesId: [],
        tvShowsId: [],
      },
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
          
          // accesso a tutti gli id di movies
          this.store.movies.id = this.store.movies.map(movie => movie.id);
          // accesso a tutti gli id di tvshows
          this.store.tvShows.id = this.store.tvShows.map(tvShow => tvShow.id);

          console.log('All Movie IDs:', this.store.movies.id );
          console.log('All TV Show IDs:', this.store.tvShows.id);

          this.allItemsId = {
            moviesId: [...this.store.movies.id],
            tvShowsId: [...this.store.tvShows.id]
          };
          console.log('All Item IDs:', this.allItemsId);
         
          this.store.loading = false;


        });
        
          
      
      },

      //gestire show more per un item
      handleShowMore(itemEvent) {
        //estrai l'item e mediatype dall'evento
        const item = itemEvent.item;
        const mediaType = itemEvent.mediaType || this.store.mediaType;
        console.log('Media Type:', mediaType);
        console.log('Clicked:', item, item.id);
        //controlla  mediatype e chiama la funzione specifica

        if (mediaType === 'movie') {
          this.handleShowMoreMovie(item);
        } else if (mediaType === 'tv') {
          this.handleShowMoreTVShow(item);
        } else {
          console.error('Invalid media type:', mediaType);
        }
      },

      //per festire showmore x movies:

      handleShowMoreMovie(item) {
        //estrai l'id del movie selezionato
        const id = item.id;
        console.log(id);
        //item selezionato, log
        const selectedItemIds = this.selectedItemIds;
        console.log (selectedItemIds);
        console.log('Selected Item IDs:', this.selectedItemIds);
        console.log ('selected items lenght', this.selectedItemIds.length );
        //costruisci l'api url per predere le info
        this.store.apiId = id;
        console.log(this.store.apiId);

        const idApiUrl = `${this.store.baseApiUrlById}movie/${this.store.apiId}?${this.store.api_key}${this.store.credits}`;
        console.log(idApiUrl);

        //loading = true prima dellapi request

        this.store.loading = true;

        axios.get(idApiUrl)
        .then ((apiIdResp) => {
          //update di store con le informazioni
          this.store.moviesId.results = apiIdResp.data;
          console.log('data prop', apiIdResp.data);
          //estrai genere e cast
          const genres = apiIdResp.data.genres;
          const cast= apiIdResp.data.credits.cast;
          console.log(genres, cast);

          //estrarre nome dei first five

          const firstFiveCastNames = cast.slice(0, 5).map(member => member.name);

          console.log('First five cast names:', firstFiveCastNames);
          this.store.loading = false;
        });
    
        
      }, 
      handleShowMoreTVShow(item) {

        const id = item.id;
        console.log(id);

        const selectedItemIds = this.selectedItemIds;
        this.store.apiId = id;
        console.log(this.store.apiId);

        const idApiUrl = `${this.store.baseApiUrlById}movie/${this.store.apiId}?${this.store.api_key}${this.store.credits}`;
        console.log(idApiUrl);

        this.store.loading = true;

        axios.get(idApiUrl)
        .then ((apiIdResp) => {
          this.store.tvShowsId.results = apiIdResp.data;
          console.log('data prop', apiIdResp.data);
          const genres = apiIdResp.data.genres;
          const cast= apiIdResp.data.credits.cast;
          console.log(genres, cast);

          const firstFiveCastNames = cast.slice(0, 5).map(member => member.name);

          console.log('First five cast names:', firstFiveCastNames);
          this.store.loading = false;
        });
        
      }, 


  },
  computed: {
    //computed per calcolare id di movie e tvshow
    movieIds() {
    return this.allItemsId.moviesId || [];
    },
    tvShowIds() {
      return this.allItemsId.tvShowsId || [];
    },
    //computed per calcolare l'item selezioato basandosi su mediatyoe
    selectedItemIds() {
      const mediaType = this.store.mediaType;
      return mediaType === 'movie' ? this.movieIds : this.tvShowIds;
    }
  }
  

}

</script>

<template>
  
  <div class="container">
  
    <AppHeader @search="handleSearch"/>
    <h2 v-if="store.movies.length > 0">movies</h2>
    <div v-if="store.movies.length > 0" class="row">
      <AppContent :items="store.movies" :mediaType="'movie'" :contents="this.store.moviesId.results"  @showMore="handleShowMore"  />
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
