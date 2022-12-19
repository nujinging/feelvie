<template>
    <div class="container">
        <div class="item_container">
            <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="genreTitle">
                <swiper-slide class="category_list" v-for="genreList in genreTitle" :key="genreList.id"
                    @click="GenreList(genreList.id)">
                    {{ genreList.name }}
                    {{  }}
                </swiper-slide>
            </swiper>

            <ul v-if="list" @scroll="handleNotificationListScroll" style="height: 500px;overflow: auto;">
                <li v-for="item in list" :key="item.id" @click="goDetail(item.id)">
                    <img :src="image(item.poster_path)" alt="">
                </li>
            </ul>
        </div>
        <!-- 오늘 -->
        <div class="item_container">
            <ItemList :movieList="dayList" :title="title[0]" :photo="day_photo"></ItemList>
        </div>
        <!-- 이번주 -->
        <div class="item_container">
            <ItemList :movieList="weekList" :title="title[1]" :photo="week_photo"></ItemList>
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
            title: ['오늘 ! 가장 있기있는 컨텐츠', '이번주 가장 있기있는 컨텐츠']
        };
    },
    
    // Genre Title
    async created() {
        const { data } = await movieApi.genre(this.linkValue);
        this.genreTitle = data.genres;
        




        const trendingDay = await movieApi.trending('movie', 'day');
        const trendingWeek = await movieApi.trending('movie', 'week');
        this.dayList = trendingDay.data.results
        this.weekList = trendingWeek.data.results

        this.day_photo = this.dayList.map(key => key.poster_path)
        this.week_photo = this.weekList.map(key => key.poster_path)
    },

    methods: {


        // 데이터가 두번 도는거 난중에 해결
        // Ganre List - Click
        async GenreList(value) {
            this.page = 1;
            this.list = [];
            this.genre = value;
            const { data } = await movieApi.genreList(this.genre, this.page);
            this.list = data.results;
            console.log(this.page)
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
            console.log(this.page)
        },

        // List Image
        image(img) {
            return `https://image.tmdb.org/t/p/w300/${img}`
        },

        // Detail Page
        goDetail(id) {
            this.$router.push(`/detail/${id}`);
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