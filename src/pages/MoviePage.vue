<template>
  <div class="container-fluid">
    <div
      class="header-img row text-light p-5"
      :style="`background-image: url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`"
    >
      <h3 class="col-12 text-center">{{ movie.title }}</h3>
      <h3 class="col-12 text-center">
        <i class="mdi mdi-star"></i>{{ movie.vote_average }}
      </h3>
      <p class="bg-dark p-2">{{ movie.overview }}</p>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { moviesService } from "../services/MoviesService";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        logger.log(route.params);
        await moviesService.getMovieById(route.params.id);
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });
    return {
      movie: computed(() => AppState.activeMovie),
    };
  },
};
</script>


<style lang="scss" scoped>
.header-img {
  background-position: center;
  background-size: cover;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.586);
}
</style>
