<template>
    <Header></Header>
    <div class="container">
        <section class="person_detail">
            <picture class="profile_picture">
                <img :src="image(personDetail.profile_path)" alt="Image 2">
            </picture>
            <div class="profile_info">
                <h1 v-for="name in personDetail.also_known_as" :key="name"> {{ name }}</h1>
                <!-- 살려주세요 사람이 빠졌어요 -->
                <!-- <h1> {{ personDetail.also_known_as[0] }}</h1> -->
                <p> {{ personDetail.birthday }}</p>
            </div>
        </section>
    </div>

</template>

<script>
import { movieApi } from '../utils/axios';

export default {
    name: 'PersonDetail_',
    data() {
        return {
            personDetail: {},
            personWork: {}
        };
    },
    methods: {
        image(img) {
            return `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${img}`
        },
    },
    async mounted() {
        // 인물 ID값에 따른 정보
        const { id } = this.$route.params;

        const personDetail = await movieApi.personDetail(id);
        this.personDetail = personDetail.data;
        console.log(this.personDetail)

        const personWork = await movieApi.personWork(id);
        this.personWork = personWork.data;
        // console.log(this.personWork)

    },
}
</script>

<style>
.person_detail {
    display: flex
}
</style>

