<script>
export default {

    //props
    props: {
        movies: Array,
    }

}
</script>

<template>
    <div class="col" v-for="movie in movies" :key="movie.id">

    
        <div class="card">

            <!-- //interpolazione -->
            <p> Titolo: {{ movie.title }}</p>
            <p> Titolo originale: {{ movie.original_title  }}</p>
            <p> Lingua: {{ movie.original_language  }}</p>
            <p> Voto: {{ movie.vote_average }} </p>
        </div>
    </div>
</template>

<script scoped>
</script>