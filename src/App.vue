<script >
import axios from "axios";
import { store } from "./store.js";
import AppHeader from "./components/AppHeader.vue";

export default {
  data() {
    return {
      store,
    };
  },
  created(){
    this.store.loading = true;
    axios.get(this.store.apiUrl).then((resp) => {
      this.store.movies = resp.data.results;
      this.store.loading = false;
    });

  },
  components: {
    AppHeader,
    
}
}

</script>

<template>
  <AppHeader/>
  
  
    
</template>

<style scoped>

</style>
