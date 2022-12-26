<template>
    <div class="container">
        <section class="person_detail">
            <picture class="profile_picture">
                <img :src="image(personDetail.profile_path)" alt="Image 2">
            </picture>
            <div class="profile_info">
                <div class="profile_name">
                    <h1 v-if="personDetail.also_known_as"> {{ personDetail.also_known_as[1] }}</h1>
                    <ul class="social_links">
                        <li v-if="this.facebookLink">
                            <a :href="`https://facebook.com/${this.facebookLink}`" class="facebook" target="_blank">
                                <span class="blind">페이스북</span>
                            </a>
                        </li>
                        <li v-if="this.twitterLink">
                            <a :href="`https://twitter.com/${this.twitterLink}`" class="tritter" target="_blank">
                                <span class="blind">트위터</span>
                            </a>
                        </li>
                        <li v-if="this.instagramLink">
                            <a :href="`https://instargram.com/${this.instagramLink}`" class="instargram"
                                target="_blank">
                                <span class="blind">인스타그램</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="profile_desc">
                    <dl>
                        <dt>생년월일</dt>
                        <dd>{{ personDetail.birthday }}</dd>
                    </dl>
                    <dl>
                        <dt>성별</dt>
                        <dd>{{ (personDetail.gender == 2) ? '남자' : '여자' }}</dd>
                    </dl>
                </div>
                
                <ItemList :movieList="knownWork" :title="title" :photo="knownWork_photo"></ItemList>
            </div>
        </section>


        <!-- 작품 리스트 -->
        <section class="work">
            <div class="work_top">
                <h3>필모그래피</h3>
                <ul class="type_list">
                    <li>
                        <button type="button" class="active" @click="ganreTab(this.movieList)">영화</button>
                    </li>
                    <li>
                        <button type="button" @click="ganreTab(this.tvList)">TV</button>
                    </li>
                </ul>
            </div>

            <ul class="work_list">
                <template v-for="work in movieList" :key="work.id">
                    <li v-if="work.title || work.character && work.name" @click="goDetail(work.id)">
                        <p class="tit">
                            {{ work.name }}
                            {{ work.title }}
                        </p>
                        <span class="char">
                            {{ work.character }} 역
                        </span>
                    </li>
                </template>

            </ul>
        </section>
    </div>

</template>

<script>
import ItemList from './ItemList.vue'
import { movieApi } from '../utils/axios';

export default {
    name: 'PersonDetail_',
    data() {
        return {
            personDetail: {},
            personWork: {},
            personSocial: {},
            facebookLink: {},
            twitterLink: {},
            instagramLink: {},
            movieList: [],
            tvList: [],
            personTv: [],
            gender: '남자',
            test: [],
            list_type: '',
            knownWork_photo:'',
            title: '가장 평점이 높은 작품'
        };
    },
    methods: {
        image(img) {
            return `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${img}`
        },
        // Detail Page
        goDetail(id) {
            this.$router.push(`/detail/${id}`);
        },
    
        async ganreTab(id) {
            this.list_type = id;
        }
    },
    async mounted() {
        // 인물 ID값에 따른 정보
        const { id } = this.$route.params;
        

        // 인물 정보
        const personDetail = await movieApi.personDetail(id);
        this.personDetail = personDetail.data;

        // 영화
        const personWork = await movieApi.personWork(id);
        this.personWork = personWork.data;

        // 인기있는 작품 (정렬 후)
        const knownWork =  [...this.personWork.cast].sort(function(a, b) {return b.vote_average - a.vote_average}).slice(0, 10);
        this.knownWork = knownWork
        this.knownWork_photo = this.knownWork.map(key => key.poster_path)
        console.log(this.knownWork)

        // 정렬하기 전 
        console.log(this.personWork.cast)

        // Tv
        const personTv = await movieApi.personTv(id);
        this.personTv = personTv.data;

        // 영화 날짜순으로 정렬
        const movieList = this.personWork.cast.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        this.movieList = movieList


        // Tv 날짜순으로 정렬
        const tvList = this.personTv.cast.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        this.tvList = tvList

        // 소셜
        const personSocial = await movieApi.personSocial(id);
        this.facebookLink = personSocial.data.facebook_id
        this.twitterLink = personSocial.data.twitter_id
        this.instagramLink = personSocial.data.instagram_id
    },
    components: {
    ItemList
  }
}
</script>

<style>

.person_detail {position: relative;display: flex;padding: 3.125vw 3.125vw 5.125vw;color: #fff}
.person_detail .profile_picture {margin-right:65px}
.person_detail .profile_info {overflow:hidden}
.person_detail .profile_info .item_container {padding:0}
.person_detail .profile_info .profile_name {display:flex;align-items:center;margin-bottom:50px}
.person_detail .profile_info .profile_name h1 {font-size:45px;font-weight:bold}
.person_detail .profile_info .profile_desc dl {display:inline-block;margin-bottom:50px;vertical-align:top;font-size:28px}
.person_detail .profile_info .profile_desc dl+dl {margin-left:50px}
.person_detail .profile_info .profile_desc dt {margin-bottom:15px;font-weight:bold}
.person_detail .profile_info .profile_name .social_links {margin-left:50px}
.person_detail .profile_info .profile_name .social_links li {display: flex;align-items: center;justify-content: center;width: 72px;height: 72px;border-radius: 50%;background: #fff}
.person_detail .profile_info .profile_name .social_links li+li {margin-top: 15px}
.person_detail .profile_info .profile_name .social_links li a {width: 50px;height: 50px;background: #000}
.person_detail .profile_info .profile_name .social_links li a.facebook {background: url(./../assets/icon_facebook.png) center no-repeat}
.person_detail .profile_info .profile_name .social_links li a.tritter {background: url(./../assets/icon_twitter.png) center no-repeat}
.person_detail .profile_info .profile_name .social_links li a.instargram {background: url(./../assets/icon_instagram.png) center no-repeat}
.work {padding:3.125vw 3.125vw 10.125vw}
.work .work_list li{display:flex;align-items:center;font-size:20px;cursor:pointer}
.work .work_list li:hover .tit {color:#4876ef}
.work .work_list li+li {margin-top:15px}
.work .work_list li .char {margin-left:auto}
.work_top {display:flex;align-items:center;margin-bottom:30px}
.work_top h3 {font-size:26px;font-weight:bold}
.type_list {display:flex;align-items:center;margin-left:0.938rem}
.type_list li+li {margin-left:0.625rem} 
.type_list li button {display:flex;align-items:center;height:2.5rem;padding:0 0.938rem;color:#fff;font-size:1.375rem;border:1px solid #fff;border-radius:3.125rem;background:#000}
.type_list li button.active {color:#000;border-color:#000;background:#fff}


</style>

