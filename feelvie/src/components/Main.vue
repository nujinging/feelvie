<template>
  <Header></Header>
  <div class="container">
      <ItemList :movieList="nowPlaying" :title="title[0]"></ItemList>
      <ItemList :movieList="popular" :title="title[1]"></ItemList>
      <ItemList :movieList="TopRated" :title="title[2]"></ItemList>
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
      title: ['지금 상영중인 영화', '인기있는 영화', '최고의 등급'],
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
  },
}
</script>

<style>

</style>