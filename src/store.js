import { reactive } from Vue;

export cost store = reactive ({
    movies: [],
    apiUrl: "https://api.themoviedb.org/3/search/movie?api_key=a1d577f4ebc3067f0e142a27e8005ace&query ",
    loading : false,
    searchText: "",
});