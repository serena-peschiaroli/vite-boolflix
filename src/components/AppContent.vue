<script>
</script>

<template>
    <div class="col" v-for="movie in store.movies" key:="movie.id">

    
        <div class="card">
            <p> Titolo: {{ movie.title }}</p>
            <p> Titolo originale: {{ movie.original_title  }}</p>
            <p> Lingua: {{ movie.original_language  }}</p>
            <p> Voto: {{ movie.vote_average }} </p>
        </div>
    </div>
</template>

<script scoped>
</script>