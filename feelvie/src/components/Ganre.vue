<template>
    <div class="container">
        <div class="item_container">
            <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper ganre_title" v-if="genreTitle">
                <swiper-slide class="category_list" v-for="genreList in genreTitle" :key="genreList.id"
                    @click="GenreList(genreList.id)">
                    {{ genreList.name }}
                </swiper-slide>
            </swiper>

            <ul class="ganre_list" v-if="list" @scroll="handleNotificationListScroll">
                <li v-for="item in list" :key="item.id" @click="goDetail(this.linkValue, item.id)" class="list_card">
                    <img :src="image(item.poster_path)" alt="">
                    <p class="tit"> {{ this.linkValue ==  "movie" ? item.title : item.name }} </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
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
            isActive: false,
            selected: '',
            typeList: ['영화', 'TV'],
            title: ['지금 상영중인 영화', '인기있는 영화', '최고의 등급'],

        };
    },

    // Genre Title
    async mounted() {
        const { data } = await movieApi.genre(this.linkValue);
        this.genreTitle = data.genres;

        const popular = await movieApi.popular(this.linkValue);
        this.list = popular.data.results;

        // this.list.forEach(function(value) {
        //         const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        //         // value.title === korean ? this.list.splice(idx,1) : '' ;
        //         value.title === korean ? value.style.color='red' : value.style.color='blue'
        //     });

    },

    methods: {
        select(e) {
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
        SwiperSlide
    }
}
</script>

<style>
.ganre_title {position:sticky;top:80px;background:#000}
.category_list {width: auto;padding: 10px 20px;color: #fff;font-size: 20px;border-radius: 32px;cursor: pointer;background: #0372D2}
.category_list:hover {color: #0372D2;background: #fff}
.ganre_list {display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;margin-top:60px}
.ganre_list .tit {margin-top:15px;color: #d5d5d5;font-size:22px;font-weight:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.list_card img {border-radius:8px}
.list_card:hover {transform: translate3d(0,-0.75rem,0);transition: transform .3s ease-in-out;cursor:pointer}
</style>