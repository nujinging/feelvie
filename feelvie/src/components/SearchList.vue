<template>
   <ul class="search_result">
        <li v-for="li in movieList" :key="li.id" @click="goDetail(li.id)">{{ li.title }}</li>
      </ul>
</template>

<script>
export default {
  name: 'item_search',
  data() {
    return {
      searchMovieList: this.movieList,
    };
  },
  props: [
    'movieList'
  ],
  methods: {
    goDetail(id){
      this.$router.push(`/detail/${id}`);
    },
  },
  computed: {
    viewMovieList() {
      console.log(this.searchMovieList)
      return this.searchMovieList
    }
  }
}
</script>

<style>
.search_result {padding:40px 20px 0 20px}
.search_result li+li {margin-top:15px}
.search_result li button {color:#fff;font-size:20px;letter-spacing:-1px;border:none;background:none}
.search_result li button span {color:#3A7CDF}

</style>