<template>
  <div class="container-fluid">
    <div class="row p-5">
      <div class="col-12">
        <Search />
      </div>
      <!-- NOTE m is the single movie in the movies array -->
      <div v-for="m in movies" :key="m.id" class="col-3 p-2">
        <Movie :movie="m" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 text-end">
        <button
          :disabled="currentPage <= 1"
          class="btn btn-info px-3 py-2 btn-block"
          @click="changePage(currentPage - 1)"
        >
          prev
        </button>
      </div>
      <p class="col-3 text-center">
        page {{ currentPage }} of {{ totalPages }}
      </p>
      <div class="col-3 text-start">
        <button
          :disabled="currentPage >= totalPages"
          class="btn btn-info px-3 py-2 btn-block"
          @click="changePage(currentPage + 1)"
        >
          next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { moviesService } from "../services/MoviesService";
import { computed, onMounted, onUnmounted } from "@vue/runtime-core";
import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    // NOTE onMounted is one of vue's lifecycle hooks and runs when this component is loaded into the DOM
    onMounted(async () => {
      try {
        await moviesService.getMovies("discover/movie");
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });
    return {
      movies: computed(() => AppState.movies),
      currentPage: computed(() => AppState.currentPage),
      totalPages: computed(() => AppState.totalPages),
      async changePage(pageNumber) {
        try {
          await moviesService.changePage(pageNumber);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
