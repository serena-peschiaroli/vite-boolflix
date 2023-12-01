<script>
import { continents, countries, languages } from 'countries-list'
// Utils
import { getEmojiFlag } from 'countries-list'
import { convertRange } from '../utility'

export default {
  // props
  props: {
    items: Object,
    mediaType: String,
  },
  data(){
    return{
        showDetails: false,
    };
  },
  
  methods: {
    getFlagEmoji(languageCode, item) {

        const emojiMappings = {en: 'GB', it: 'IT', es: 'ES', de: 'DE', ja: 'JP', zh: 'CHN'};

        const normalizedLanguageCode = languageCode.toLowerCase();
        const countryCode = emojiMappings[normalizedLanguageCode.toUpperCase()];

        return countryCode ? getEmojiFlag(countryCode) : (item && item.original_language) || 'Unknown';
    },
   
    getPosterUrl(posterPath, size = 'w342') {
      // url di base
      const baseUrl = 'https://image.tmdb.org/t/p/';

      // costruisci l'url intero
      return `${baseUrl}${size}${posterPath}`;
    },
   

    getRating(item){
        
        const rating = Math.ceil(item.vote_average / 2);
        return rating;
        
    
   },
    handleShowDetails() {
      this.showDetails = true;
    },

    handleHideDetails() {
      this.showDetails = false;
    },
  }
}

    


</script>

<template>
  
        
    
        <div class="col" v-for="item in items" :key="item.id">
        
                <div class="card" @mouseenter="handleShowDetails" @mouseleave="handleHideDetails">
            <!-- poster -->
                    <img v-if="!showDetails" :src="getPosterUrl(item.poster_path, 'w342')" alt="Poster" />
                    <div v-if="showDetails" class="card-details">
                        <!-- infos -->
                        <p>{{ item.title }}</p>
                        <p>{{ item.original_title || item.original_name }}</p>
                        <p>{{ item.original_language }} - {{ getFlagEmoji(item.original_language, item) }}</p>
                        <p>
                        Voto: {{ getRating(item) }}
                        <i
                            v-for="index in 5" class="fa-star" :class=" index <= getRating(item) ? 'fa-solid' : 'fa-regular'"
                            :key="index"
                            
                        ></i>
                        </p>
                        <p>{{ item.overview }}</p>
                    </div>
                </div>

        </div>
   
</template>


<style lang="scss" scoped>
@use "../style/general.scss";
@import "@fortawesome/fontawesome-free/css/all.css";

.col {
   

    .card {
        position: relative;
        width: 200px;
        height: 300px ;
        padding: 1rem;
        background-color: black;
        border: 1px solid whitesmoke;
        img {
            width: 100%;
            height: 100%;
        }
        
    }
    .card-details {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        border: 1px solid gray;
        box-sizing: border-box;
        opacity: 0;
        transition: opacity 0.3s ease;

        &:hover {
        opacity: 1;
        }
    
    
        
        
    }


}










</style>