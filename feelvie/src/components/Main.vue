<template>
    <div class="container">
        <div class="item_container">
            <swiper :pagination="{
                dynamicBullets: true,
            }" :modules="modules" class="mySwiper home_banner">
                <swiper-slide v-for="list in popularTv" :key='list.id'
                    :style="{ backgroundImage: 'url( https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + list.backdrop_path + ')' }"
                    @click="goDetail(list.id)">
                    <div class="banner_txt">
                        <h2 class="tit" v-if="list.name"> {{ list.name }}</h2>
                        <p> {{ list.overview }}</p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="item_container list">
            <ul class="type_list">
                <li>
                    <button type="button" @click="ganreTab('movie' ,'now_playing')">영화</button>
                </li>
                <li>
                    <button type="button" @click="ganreTab('tv', 'on_the_air')">TV</button>
                </li>
            </ul>
            <!-- 지금 상영중인 영화 -->
            <ItemList :movieList="nowPlaying" :type="list_type" :title="title[0]" :photo="now_photo"
                :listInfo="listInfo[0]"></ItemList>
            <!-- 인기있는 영화 -->
            <ItemList :movieList="popularList" :type="list_type" :title="title[1]" :photo="pop_photo"></ItemList>
            <!-- 최고의 등급 -->
            <ItemList :movieList="TopRatedList" :type="list_type" :title="title[2]" :photo="top_photo"></ItemList>
        </div>

    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import ItemList from './ItemList.vue'
import { Pagination } from "swiper";
import { movieApi } from '../utils/axios';

export default {
    name: 'Main_',
    data() {
        return {
            nowPlaying: {},
            popular: {},
            TopRatedList: {},
            popularList: {},
            title: ['지금 상영중인 영화', '인기있는 영화', '최고의 등급'],
            popularTv: [],
            list_type: 'movie',
            nowType:'',
            listInfo:
                [
                    { title: '지금 상영중인 영화', photo: this.now_photo },
                    { title: '인기있는 영화', photo: this.pop_photo },
                    { title: '최고의 등급', photo: this.pop_photo },
                ],
        }
    },
    methods: {
        goDetail(id) {
            this.$router.push(`/detail/${id}`);
        },

        async ganreTab(id, nowType) {
            this.list_type = id;
            const now = await movieApi.nowPlaying(this.list_type, nowType);
            this.nowPlaying = now.data.results;

            console.log(this.list_type)

            const popular = await movieApi.popular(this.list_type);
            this.popularList = popular.data.results;


            const TopRated = await movieApi.TopRated(this.list_type);
            this.TopRatedList = TopRated.data.results;


            this.now_photo = this.nowPlaying.map(key => key.poster_path)
            this.pop_photo = this.popularList.map(key => key.poster_path)
            this.top_photo = this.TopRatedList.map(key => key.poster_path)
        }
    },
    components: {
        Swiper,
        SwiperSlide,
        ItemList
    },
    async mounted() {
        const now = await movieApi.nowPlaying(this.list_type, 'now_playing');
        this.nowPlaying = now.data.results;

        const popular = await movieApi.popular(this.list_type);
        this.popularList = popular.data.results;


        const TopRated = await movieApi.TopRated(this.list_type);
        this.TopRatedList = TopRated.data.results;


        this.now_photo = this.nowPlaying.map(key => key.poster_path)
        this.pop_photo = this.popularList.map(key => key.poster_path)
        this.top_photo = this.TopRatedList.map(key => key.poster_path)


        const popularTv = await movieApi.popularTv();
        this.popularTv = popularTv.data.results;

        this.backGround = this.popularTv.backdrop_path
    },
    setup() {
        return {
            modules: [Pagination],
        };
    },
}
</script>

<style>
.home_banner {position:relative;height:600px;margin-bottom:100px}

.home_banner .banner_txt {position:absolute;left:50px;bottom:50px}
.home_banner .banner_txt .tit {font-size:40px}
.home_banner .banner_txt p {margin-top:30px;font-size:22px}
</style>