<template>
  <div class="container">
    <section class="search_container">
      <form>
        <label class="search_input" for="search_input">
          <input id="search_input" type="text" @keyup="autoSearch($event)"
            onkeypress="if(event.keyCode=='13'){event.preventDefault()}" placeholder="TV프로그램, 영화 제목 및 출연진으로 검색해보세요"
            class="search_txt">
          <button type="button" class="icon_search">
            <span class="blind">검색</span>
          </button>
        </label>
      </form>

      <div class="search_none" v-if="searchNone">
        검색결과가 없습니다.
      </div>
    </section>

    <div class="item_container">
      <ul class="search_list" v-if="movieList">
        <li v-for="item in movieList" :key="item.id" @click="goDetail(item.media_type, item.id)" class="list_card">
          <img :src="image(item.poster_path)" alt="">
          <p class="tit"> {{ item.title }}</p>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
import { movieApi } from '../utils/axios';
import { debounce } from 'lodash'

export default {
  name: 'Search_',
  data() {
    return {
      movieList: '',
      images: ['image_none.png'],
      searchResult: '',
      searchNone: false
    };
  },
  methods: {
    // 값을 입력하고 0.1초 뒤 api 호출
    autoSearch: debounce(async function (e) {
      const searchText = e.target.value;
      // 공백이 없거나 달라도 검색되게 공백제거
      const searchResult = searchText.replace(/(\s*)/g, "");
      // 검색결과
      const { data } = await movieApi.search(searchResult);
      this.movieList = data.results;
      this.search_photo = this.movieList.map(key => key.poster_path);
      // 검색결과가 없을 때
      this.searchNone = this.movieList.length === 0 ? true : false;
    }, 100),
    
    image(img) {
      if (img == undefined) {
        // 이미지 없을 때
        return require(`@/assets/${this.images}`)
      } else {
        return `https://image.tmdb.org/t/p/w300/${img}`
      }
    },

    // Detail Page
    goDetail(type, id) {
      this.$router.push(`/${type}/${id}`);
    },
  }
}
</script>

<style>
.search_container {margin:0 auto;padding:3.125vw;width:80%}
.search_container .search_input {position:relative;display:block;padding:3.75em 0 1em;border-bottom:2px solid #fff}
.search_container .search_input .search_txt {width:calc(100% - 60px);color:#eee;font-size:28px;font-weight:bold;border:none;background:none;font-family: 'Noto Sans KR', sans-serif}
.search_container .search_input .icon_search {position:absolute;right:0;bottom:0;width:50px;height:50px;background:url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='32' height='32' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_12_305' transform='scale(0.03125)'/%3E%3C/pattern%3E%3Cimage id='image0_12_305' width='32' height='32' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB2klEQVRYhe2WO0vEQBSF7wRLSwmyyGItVmJtoY1YiMgW1oIoYiEisv9EtrCwsLMVK3+F4GIhYieoWIjI4uOzmBHD3Ukyk6zaeCHFTvac881kXkYKCkhFpCUicyIyISKpe3UvIhciciYix8aY2yKf6AJSoAP0KK8ecAA0BhW+ANwFBOt6BJbqhq8C7xXCv+od2KjTc1/4FbAHTAMj7pkCdoHLHIjl2PCU/mF/BdrAUIFuCNihf648EjMnsBNOhy9G6Oc9EIeh4tQjbgfTf/tsezoxFiLcVMKromEv8EmArvLaKdMlYjeZbHWMMW+xAMaYDxHZV83au7881NOx4RmvSeV1HSJ6UKKRGgDDyuu5TJNUDcupj1hBIvZgyVazBsC4+q29vQAXqm22BoDWam8vwJlqW6u6DEVkXTVrb69w1LMRla5fj4/eT16BsM+JPc+z1QPmI8JngRflcRRD38AeIBpi2w1tni5xPdfhT8G9z5gt4T+Ouw5kErvOh4EJYAs49/z/a/hXogAcxEYORJWqDLFM/+cIqScXOhCIBnDoMczr6RHQBFYGBuFAxrA3nhPgGnh2zw1wir2WNZVmsBAVwf8h/iFCIVp/DVF+ZfthiO6vAjiIFnZP6QIzn9TA/Qx6PEfbAAAAAElFTkSuQmCC'/%3E%3C/defs%3E%3C/svg%3E%0A") center no-repeat}
/*.item_container {padding-left:30px}*/
.search_none {height:50vh;display:flex;align-items:center;justify-content:center;color:#757575;font-size:28px;font-weight:bold}
.search_list {display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;margin-top:60px}
.search_list li {display:inline-block}
.search_list .tit {margin-top:15px;color: #d5d5d5;font-size:22px;font-weight:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
</style>