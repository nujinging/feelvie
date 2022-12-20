<template>
    <div class="container">
        <div class="item_container">
            <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="genreTitle">
                <swiper-slide class="category_list" v-for="genreList in genreTitle" :key="genreList.id"
                    @click="GenreList(genreList.id)">
                    {{ genreList.name }}
                </swiper-slide>
            </swiper>

            <ul v-if="list" @scroll="handleNotificationListScroll" style="height: 500px;overflow: auto;">
                <li v-for="item in list" :key="item.id" @click="goDetail(this.linkValue, item.id)">
                    <img :src="image(item.poster_path)" alt="">
                </li>
            </ul>
                     <!-- 인기있는 영화 -->
                     <ItemList :movieList="popularList" :type="list_type" :title="title[1]" :photo="pop_photo"></ItemList>
        </div>
    </div>
</template>

<script>
import ItemList from './ItemList.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { movieApi } from '../utils/axios';

export default {
    name: 'Ganre_',
    props: ['ganreList', 'linkValue'],
    data() {
        return {
            list: {},
            page: 1,
            genreTitle: {},
            genre: '',
            newList: {},
            dayList: [],
            weekList: {},
            popularList: {},
            list_type: 'movie',
            isActive:false,
            selected:'',
            typeList:['영화','TV'],
            title: ['지금 상영중인 영화', '인기있는 영화', '최고의 등급'],
   
        };
    },

    // Genre Title
    async mounted() {
        const { data } = await movieApi.genre(this.linkValue);
        this.genreTitle = data.genres;

        const popular = await movieApi.popular(this.linkValue);
            this.popularList = popular.data.results;
            this.pop_photo = this.popularList.map(key => key.poster_path)
    },

    methods: {
        select(e){
      this.selected = e
      },

        // 데이터가 두번 도는거 난중에 해결
        // Ganre List - Click
        async GenreList(value) {
            this.page = 1;
            this.list = [];
            this.genre = value;
            const { data } = await movieApi.genreList(this.linkValue, this.genre, this.page);
            this.list = data.results;
        },

        // Scroll
        handleNotificationListScroll(e) {
            const { scrollHeight, scrollTop, clientHeight } = e.target;
            const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
            if (isAtTheBottom) this.handleLoadMore();
        },
        async handleLoadMore() {
            this.page++
            const { data } = await movieApi.genreList(this.genre, this.page)
            this.list = [...this.list, ...data.results]
        },

        // List Image
        image(img) {
            return `https://image.tmdb.org/t/p/w300/${img}`
        },

        // Detail Page
        goDetail(type, id) {
            this.$router.push(`/${type}/${id}`);
        },
    },
    components: {
        Swiper,
        SwiperSlide,
        ItemList,
    }
}
</script>

<style>
.category_list {width: auto;padding: 10px 20px;color: #fff;font-size: 20px;border-radius: 32px;cursor: pointer;background: #0372D2}
.category_list:hover {color: #0372D2;background: #fff}
</style>