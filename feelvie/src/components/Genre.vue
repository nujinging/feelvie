<template>
  <ul v-if="genres" style="display:flex">
    <li v-for="genreList in genres" :key="genreList.id" @click="goDetail(genreList.id)" style="margin:0 10px">
      {{ genreList.name }}
    </li>
  </ul>
  <ul v-if="test">
    <li v-for="item in test" :key="item.id" @click="goDetail2(item.id)">
    <img :src="image(item.poster_path)" alt=""></li>
  </ul>
</template>

<script>
import { movieApi } from '../utils/axios';

export default {
  name: 'ganre_',
  data() {
    return {
      test: {},
      genres: {}
    };
  },
  watch: {
  },

  methods: {
    async goDetail(value) {
      const { data } = await movieApi.genreList(value);
      this.test = data.results;
      console.log(this.test);
      console.log(data);
    },

    goDetail2(id){
      this.$router.push(`/detail/${id}`);
    },
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
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