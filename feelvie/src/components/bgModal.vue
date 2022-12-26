<template>
    <div class="intro_modal">
        <div class="inner">
            
            <a :href="`https://image.tmdb.org/t/p/original/${img}`" class="facebook" target="_blank">
                <img :src="image(img)" @click="detailImg(this.img)">
              </a>
            <p>{{  width }}</p>
            <p>{{  height }}</p>
            <button type="button" @click="$emit('close')">닫기</button>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Main_',
    data() {
        return {
        }
    },
    props: ['img','width','height'],
    methods: {
        image(img) {
      return `https://image.tmdb.org/t/p/w400/${img}`
        },

        detailImg(img) {
            return `https://image.tmdb.org/t/p/original/${img}`
        }
    },

}
</script>

<style>
.intro_modal {position:fixed;top:0;left:0;z-index:600}
.intro_modal:before  {position:fixed;top:0;left:0;width:100%;height:100%;background:#000000a1;content:''}
.intro_modal .inner {position:fixed;top:50%;left:50%;padding:20px;width:500px;color:#ddd;border-radius:20px;background:#fff;transform:translate(-50%, -50%);}
</style>