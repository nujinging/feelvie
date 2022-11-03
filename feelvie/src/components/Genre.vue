<template>
  <Header></Header>
  <p>s</p>
  <SearchList :movieList="movieList"></SearchList>
  <ItemList :movieList="movieList"></ItemList>

</template>

<script>
import Header from './Header.vue'
import ItemList from './ItemList.vue'
import SearchList from './SearchList.vue'
import { movieApi } from '../utils/axios';

export default {
  name: 'ganre_',
  data() {
    return {
      ganre: {}
    };
  },
  watch: {
  },
  components: {
    Header,
    ItemList,
    SearchList
  },
  async mounted() {
    const { data } = await movieApi.genre();
    console.log(data.results);
  },
}
</script>

<style>
</style>