<template>
  <Header></Header>
  <div class="container">
      <ItemList :movieList="nowPlaying"></ItemList>
      <ItemList :movieList="popular"></ItemList>
      <ItemList :movieList="TopRated"></ItemList>
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
    }
  },
  components: {
    Header,
    ItemList,
  },
  async mounted() {
    const { data } = await movieApi.nowPlaying();
      console.log(data.results);
      this.movieList = data.results;
      console.log(this.movieList);

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