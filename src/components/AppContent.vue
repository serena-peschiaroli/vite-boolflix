<script>


// Utils

import { getCountryCode, getCountryData, getCountryDataList, getEmojiFlag } from 'countries-list'

export default {
  // props
  props: {
    items: Object,
    mediaType: String,
    contents: Object,
    
  },
  emits: ['showMore'],
  data(){
    return{
        showDetails: false,
        emojiMappings: { en: 'GB', it: 'IT', es: 'ES', de: 'DE', ja: 'JP', zh: 'CHN' },
        selectedItemIds: [],
        showMoreDetails : false,
    };
  },
  
  methods: {
    // getFlagEmoji(languageCode, item) {
    //     console.log(languageCode, item)

    //     const emojiMappings = {en: 'GB', it: 'IT', es: 'ES', de: 'DE', ja: 'JP', zh: 'CHN'};

    //     const normalizedLanguageCode = languageCode.toLowerCase();
    //     console.log(normalizedLanguageCode)
    //     const countryCode = emojiMappings[normalizedLanguageCode.toUpperCase()];
    //     console.log('Country Code:', countryCode);
    //     const emojiFlag = countryCode ? getEmojiFlag(countryCode) : (item && item.original_language) || 'Unknown';

    //     console.log('Emoji Flag:', emojiFlag);

    //     return emojiFlag;
    // },
    getCountryCode(languageCode) {
        return (languageCode && languageCode in this.emojiMappings) ? this.emojiMappings[languageCode] : 'Unknown';
  },

   getFlagEmoji(languageCode, item) {
    const countryCode = this.getCountryCode(languageCode);
    

    if (countryCode) {
      
        const emojiFlag = getEmojiFlag(countryCode);
        return emojiFlag;
    }
    

    return (item && item.original_language) || 'Unknown';
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

    showMore(item) {
      console.log("clicked", item, item.id)
      //emit

      if (item && item.id) {
        this.selectedItemIds.push(item.id);
        this.$emit('showMore',{item, mediaType: this.mediaType })
      }
     
    },
    handleShowMoreDetails() {
      this.showMoreDetails = true;
      this.showDetails = false;
    },

    handleHideMoreDetails() {
      this.showMoreDetails = false;
      this.showDetails = true; 
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
                        <p class="title" v-if="item.title === item.original_title" :class="{ hidden: item.title === item.original_title }">{{ item.title }}</p>
                        <p class="original-title">{{ item.original_title || item.original_name }}</p>
                        <p>{{ item.original_laanguage }} - {{ getFlagEmoji(item.original_language, item) }}</p>
                        <p class="rating">
                        Voto: {{ getRating(item) }}
                        <i
                            v-for="index in 5" class="fa-star" :class=" index <= getRating(item) ? 'fa-solid' : 'fa-regular'"
                            :key="index"
                            
                        ></i>
                        </p>
                        <p>{{ item.overview }}</p>
                        <p> {{ item.id }} </p>
                        <button @click="showMore(item)"> More</button>
                            <!-- <div  v-if="!showMoreDetails" class="card-more hidden">
                              <ul> Generi: 
                                <li v-for="(genre, index) in contents.genres" :key="index"> {{ genres.name }} </li>
          


                              </ul>
                              <ul> Cast: 
                                  <li v-for="(castMember, index) in contents.credits.cast.slice(0 , 5)" :key="index"> {{  castMember.name }}</li>
                              </ul>



                            </div> -->
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
        width: 250px;
        height: 350px ;
        padding: 1rem;
        background-color: black;
        border: 1px solid whitesmoke;
        img {
            width: 100%;
            height: 100%;
        }
        .title, .original-title {
            font-weight: bold;
           
        }
        p{
            margin-bottom: 5px;
            line-height: 1.2 ;
            text-align: center;
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
        padding: 1rem;
        overflow-y: scroll;

        &:hover {
        opacity: 1;
        }
    
    
        
        
    }


}


.hidden {
    display: none;
}







</style>