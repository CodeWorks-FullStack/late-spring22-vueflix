<template>
  <div class="row">
    <form @submit.prevent="searchMovies">
      <input
        v-model="search"
        type="text"
        class="col-10"
        placeholder="search movies"
      />
      <button class="col-2 btn btn-primary">
        <i class="mdi mdi-magnify"></i>
      </button>
    </form>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { moviesService } from "../services/MoviesService";
export default {
  setup() {
    const search = ref("");
    return {
      search,
      async searchMovies() {
        try {
          logger.log("searching", search.value);
          await moviesService.searchMovies(`query=${search.value}`);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
