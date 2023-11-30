<script>
import { continents, countries, languages } from 'countries-list'
// Utils
import { getEmojiFlag } from 'countries-list'

export default {
  // props
  props: {
    items: Array,
    mediaType: String,
  },
  
  methods: {
    getFlagEmoji(languageCode) {
      
      const normalizedLanguageCode = languageCode.toLowerCase();

      
      if (normalizedLanguageCode === 'en') {
        return getEmojiFlag('GB'); 
      }else if (normalizedLanguageCode === 'it') {
        return getEmojiFlag('IT')
      }else if (normalizedLanguageCode === 'es') {
        return getEmojiFlag("ES")
      }else if (normalizedLanguageCode === 'de'){
        return getEmojiFlag('DE')
      }else if (normalizedLanguageCode=== 'jp') {
        return getEmojiFlag('JP')
      }else if (normalizedLanguageCode === 'zh') {
        return getEmojiFlag('CHN')
      }
      
      const countryCode = normalizedLanguageCode.toUpperCase();
      return getEmojiFlag(countryCode) || movie.original_language; 
    }
  }
}

    


</script>

<template>
    <div class="col" v-for="item in items" :key="item.id">
        <div class="card">
        <!-- //interpolazione -->
        <p> Titolo: {{ item.title }}</p>
        <p> Titolo originale: {{ item.original_title || item.original_name }}</p>
        <p> Lingua: {{ item.original_language }} - {{ getFlagEmoji(item.original_language) }}</p>
        <p> Voto: {{ item.vote_average }} </p>
        </div>
  </div>
</template>


<style lang="scss" scoped>

.card {
    border: 1px solid black;
}
</style>