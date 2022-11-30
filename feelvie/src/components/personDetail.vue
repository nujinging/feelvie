<template>
  <Header></Header>
  <div class="container">
    <div class="person_container">
      <div class="profile">
        <img :src="image(personDetail.profile_path)" alt="Image 2">
      </div>
      <div class="info">
        <h3 class="name">
          {{ personDetail.name }}
        </h3>
      </div>
    </div>
  </div>
  
</template>

<script>
import Header from './Header.vue'
import { movieApi } from '../utils/axios';

export default {
  name: 'personDetail_',
  data() {
    return {
      personDetail: {},
    };
  },
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },
    profile(img) {
      return `https://image.tmdb.org/t/p/w138_and_h175_face/${img}`
    },
  },
  async mounted() {
    const { id } = this.$route.params;
    const { data } = await movieApi.personDetail(id);
    this.personDetail = data;
    console.log(this.personDetail)
  },
  components: {
    Header
  }
}
</script>
<style>
.person_container {position:relative;display:flex;margin-bottom:110px;padding:3.125vw 3.125vw 10.125vw;color:#fff}
.person_container .profile {}
.person_container .profile {} 
.person_container .info {}
</style>

