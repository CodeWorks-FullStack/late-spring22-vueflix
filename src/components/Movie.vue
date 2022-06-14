<template>
  <!-- <router-link :to="{ name: 'Movie' }"> -->
  <div class="row bg-dark rounded elevation-2 selectable" @click="goTo">
    <div class="col-12">
      <img
        class="img-fluid"
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        alt=""
      />
      <h5>{{ movie.title }}</h5>
      <p>{{ movie.vote_average }}</p>
    </div>
  </div>
  <!-- </router-link> -->
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  props: { movie: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {
      goTo() {
        // NOTE to access the props in setup, setup has to take them in as a parameter and you will have to dig to that object as well
        AppState.activeMovie = props.movie;
        router.push({ name: "Movie", params: { id: props.movie.id } });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
