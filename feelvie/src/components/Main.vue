<template>
  <Header></Header>
  <div class="container">
      <ItemList :movieList="nowPlaying" :title="title[0]" :photo="now_photo"></ItemList>
      <ItemList :movieList="popular" :title="title[1]" :photo="pop_photo"></ItemList>
      <ItemList :movieList="TopRated" :title="title[2]" :photo="top_photo"></ItemList>
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
      // listInfo:
      //   [
      //     {
      //       title: '지금 상영중인 영화',
      //       photo: this.now_photo
      //     },    
      //     {
      //       title: '인기있는 영화',
      //       photo: this.pop_photo
      //     },  
      //     {
      //       title: '최고의 등급',
      //       photo: this.pop_photo
      //     },    
      //   ],
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

      this.now_photo = this.nowPlaying.map(key => key.poster_path)
      this.pop_photo = this.popular.map(key => key.poster_path)
      this.top_photo = this.TopRated.map(key => key.poster_path)
  },
}
</script>

<style>

</style>