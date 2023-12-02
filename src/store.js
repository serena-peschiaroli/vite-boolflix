import { reactive } from "vue";

export const store = reactive ({
    movies: [],
    tvShows: [],
    cast:[],
    genres: [], 
    baseApiUrl: "https://api.themoviedb.org/3/search/",
    baseApiUrlById:"https://api.themoviedb.org/3/",
    apiId: null,
    api_key: "a1d577f4ebc3067f0e142a27e8005ace",
    loading: false,
    searchText: "",
    movieSearch: "movie?",
    tvSearch: "tv?",
});