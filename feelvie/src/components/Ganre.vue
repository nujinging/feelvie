<template>
    <div class="container">
        <div class="item_container">
            <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper ganre_title" v-if="genreTitle">
                <swiper-slide class="category_list" v-for="genreList in genreTitle" :key="genreList.id"
                    @click="GenreList(genreList.id)">
                    {{ genreList.name }}
                </swiper-slide>
            </swiper>

            <ul class="ganre_list" v-if="list2" @scroll="handleNotificationListScroll">
                <li v-for="item in list2" :key="item.id" @click="goDetail(this.linkValue, item.id)" class="list_card">
                    <img :src="image(item.poster_path)" alt="">
                    <p class="tit"> {{ this.linkValue == "movie" ? item.title : item.name }} </p>
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
            list2: {},
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
            result:'',
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

        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        this.list2 = this.list.filter(value => korean.test(value.name) || korean.test(value.title));
        console.log(this.list2)
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
            const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
            this.list2 = this.list.filter(value => korean.test(value.name) || korean.test(value.title));
            console.log(this.list2)
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
.ganre_title {position:sticky;top:5rem;background:#000}
.category_list {width: auto;padding: 0.625rem 1.25rem;color: #fff;font-size: 1.25rem;border-radius: 2rem;cursor: pointer;background: #0372D2}
.category_list:hover {color: #0372D2;background: #fff}
.ganre_list {display:flex;flex-wrap:wrap;gap:2.25rem;margin-top:3.75rem;padding:4.7rem}
.ganre_list .tit {margin-top:0.938rem;color: #d5d5d5;font-size:1.375rem;font-weight:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

.item_container {margin:0 auto}
.list_card {width:18.75rem}
.list_card img {border-radius:0.5rem;width:100%}
    .list_card:hover {transform: translate3d(0,-0.75rem,0);transition: transform .3s ease-in-out;cursor:pointer}


    @media screen and (max-width: 768px) {
        .list_card {width:16.4rem}
        .ganre_list {padding:0}
      }
</style>