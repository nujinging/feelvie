<template>
  <Header></Header>
  <main class="container">
    <section class="search_container">
      <form @submit.prevent="onSearch">
        <label class="search_input" for="search_input">
          <input id="search_input" type="text"  @keyup="debounceMethods($event)" placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요"
            class="search_txt">
          <button type="button" class="icon_search">검색</button>
        </label>
      </form>

      <p>{{ data }}</p>
    </section>
  </main>
  <SearchList :movieList="movieList"></SearchList>
  <ItemList :movieList="movieList"></ItemList>

</template>

<script>
import Header from './Header.vue'
import ItemList from './ItemList.vue'
import SearchList from './SearchList.vue'
import { movieApi } from '../utils/axios';
import { debounce } from 'lodash'

export default {
  name: 'item_search',
  data() {
    return {
      keyword: "",
      movieList: '',
      debounceValue: '',
      data:'',
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

  },
  
  methods: {
    debounceMethods: debounce(async function (e) {
      const { data } = await movieApi.search(e.target.value);
      this.movieList = data.results;
    },500),
  }
}
</script>

<style>
.search_container {
  margin: 0 auto;
  padding: 3.125vw 3.125vw 12.125vw;
  width: 80%;
}

.search_container .search_input {
  position: relative;
  display: block;
  padding: 3.75em 0 1em;
  border-bottom: 2px solid #fff
}

.search_container .search_input .search_txt {
  color: #eee;
  font-size: 28px;
  border: none;
  background: none
}

.search_container .search_input .icon_search {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50px;
  height: 50px;
  background: #fff
}
</style>