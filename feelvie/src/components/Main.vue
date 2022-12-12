<template>
  <Header></Header>
  <div class="container">
      <ItemList :movieList="nowPlaying" :title="nowTitle" :key2="key2"></ItemList>
      <ItemList :movieList="popular" :title="popTitle"></ItemList>
      <ItemList :movieList="TopRated" :title="topTitle"></ItemList>
  </div>
</template>
<script>
import Header from './Header.vue'
import ItemList from './ItemList.vue'
import { movieApi } from '../utils/axios';

export default {
  name: 'Main_',
  data() {
    return {
      nowPlaying: {},
      popular : {},
      TopRated: {},
      nowTitle : '지금 상영중인 영화',
      popTitle : '인기있는 영화',
      topTitle : '최고의 등급',
      key2: 'li.profile_path'
    }
  },
  components: {
    Header,
    ItemList,
  },
  async mounted() {
      const { data } = await movieApi.nowPlaying();
      this.movieList = data.results;
      const { nowPlaying, popular, TopRated } = movieApi;
      const requestArr = [nowPlaying, popular ,TopRated ];
      const [now, pop, top] = await Promise.all(
        requestArr.map((li) => li().then((res) => res.data.results))
      );
      this.nowPlaying = now;
      this.popular = pop;
      this.TopRated = top;

      console.log(this.nowPlaying)
  },
}
</script>

<style>

</style>