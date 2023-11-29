import { reactive } from "vue";

export const store = reactive ({
    movies: [],
    baseApiUrl: 'https://api.themoviedb.org/3/search/movie?',
    api_key: 'a1d577f4ebc3067f0e142a27e8005ace',
    loading: false,
    searchText: "",
});