<script>
import { continents, countries, languages } from 'countries-list'
// Utils
import { getEmojiFlag } from 'countries-list'
import { convertRange } from '../utility'

export default {
  // props
  props: {
    items: Array,
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
   

    convertRating(rating) {
      return convertRange(rating, [1, 10], [1, 5]);
    },
    getStarRating(item) {
       const convertedRating = this.convertRating(item.vote_average);

      
      const clampedRating = Math.floor(convertedRating);

      // ritorna un array che rappresenta le stelle
      return Array.from({ length: clampedRating }, (_, index) => index < clampedRating ? 'fas fa-star' : 'far fa-star');
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
                        Voto:
                        <i
                            v-for="index in 5"
                            :key="index"
                            :class="{
                            'fas fa-star': index < getStarRating(item).length,
                            'far fa-star': index >= getStarRating(item).length
                            }"
                        ></i>
                        </p>
                        <p>{{ item.overview }}</p>
                    </div>
                </div>

        </div>
   
</template>


<style lang="scss" scoped>
@use "../style/general.scss";

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
        background-color: rgba(255, 255, 255, 0.9);
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