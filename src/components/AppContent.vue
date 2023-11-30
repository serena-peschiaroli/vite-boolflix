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
  
  methods: {
    getFlagEmoji(languageCode, item) {

        const emojiMappings = {en: 'GB', it: 'IT', es: 'ES', de: 'DE', ja: 'JP', zh: 'CHN'};

        const normalizedLanguageCode = languageCode.toLowerCase();
        const countryCode = emojiMappings[normalizedLanguageCode.toUpperCase()];

        return countryCode ? getEmojiFlag(countryCode) : (item && item.original_language) || 'Unknown';
    },
   
    getPosterUrl(posterPath, size = 'w154') {
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
    }
  }
}

    


</script>

<template>
    <div class="col" v-for="item in items" :key="item.id">
        <div class="card">
             <!-- tv/movie poster -->
            <img :src="getPosterUrl(item.poster_path)" alt="Poster" />
            <!-- //interpolazione -->
            <p> Titolo: {{ item.title }}</p>
            <p> Titolo originale: {{ item.original_title || item.original_name }}</p>
            <p> Lingua: {{ item.original_language }} - {{ getFlagEmoji(item.original_language) }}</p>
            <div class="star-rating">
              <p> Rating: {{ Math.min(5, Math.max(1, Math.ceil(item.vote_average))) }}</p>
                <i
                    v-for="index in 5"
                    :key="index"
                    :class="{
                    'fas fa-star': index < getStarRating(item.vote_average).length,
                    'far fa-star': index >= getStarRating(item.vote_average).length}"

                    
                ></i>
                
                
            </div>
        </div>
  </div>
</template>


<style lang="scss" scoped>

.col {
      width: calc(100% / 3);
      box-sizing: border-box; 
      padding: 1rem; 
    
  
  
  .card {
   
    overflow: hidden;
    text-overflow: ellipsis; 
    white-space: nowrap; 
  }
  .star-rating {
    color: #ffc107; 
    font-size: 1.5em; 
  }
}
</style>