<template>
  <ul v-if="genres" style="display:flex">
    <li v-for="genreList in genres" :key="genreList.id" @click="goDetail(genreList.id)" style="margin:0 10px">
      {{ genreList.name }}
    </li>
  </ul>
  <ul>
    <li>ss</li>
  </ul>
</template>

<script>
import { movieApi } from '../utils/axios';

export default {
  name: 'ganre_',
  data() {
    return {
      genres: {}
    };
  },
  watch: {
  },

  methods: {
    goDetail(id){
      this.$router.push(`/genre/${id}/movie`);
    },
  },
  components: {
  },
  async mounted() {
    const { data } = await movieApi.genre();
    this.genres = data.genres;
    console.log(this.genres);

  
  },
}
</script>

<style>
</style>