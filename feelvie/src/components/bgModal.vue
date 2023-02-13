<template>
    <div class="intro_modal">
        <div class="inner">

            <a :href="`https://image.tmdb.org/t/p/original/${img}`" class="facebook" target="_blank">
                <img :src="image(img)" @click="detailImg(this.img)" :class="{ skeleton: isLoading }">
            </a>

            <span class="txt">이미지 클릭하여 원본보기</span>

            <p class="size">
                {{ props.width }}
                <span>X</span>
                {{ props.height }}
            </p>
            
            <button type="button" @click="$emit('close')">
                <span class="blind">닫기</span>
            </button>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from "vue";
  const props = defineProps({
    img: String,
    width: String,
    height: String
  });
const image = (img) => {
            return `https://image.tmdb.org/t/p/w400/${img}`
        }
        const detailImg = (img) => {
            return `https://image.tmdb.org/t/p/original/${img}`
        }
        
</script>

<style>
.intro_modal {position:fixed;top:0;left:0;z-index:600}
.intro_modal:before  {position:fixed;top:0;left:0;width:100%;height:100%;background:#000000a1;content:''}
.intro_modal .inner {position:fixed;top:50%;left:50%;padding:1.25rem;width:31.25rem;border-radius:1.25rem;background:#fff;transform:translate(-50%, -50%);box-sizing:border-box}
.intro_modal .inner .size {display:flex;align-items:center;margin:2rem 0 1rem;color:#000;font-size:2.063rem}
.intro_modal .inner .size:before {display:inline-block;margin-right:10px;font-weight:bold;content:'SIZE :'}
.intro_modal .inner .txt {display:block;margin-top:1rem;color:#8d8d8d;font-size:16px;text-align:right}
.intro_modal .inner button {position:absolute;bottom:-50px;left:50%;width:50px;height:50px;transform:translate(-50%, 0);background:url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='18.0103' width='5' height='25' transform='rotate(45 18.0103 0)' fill='white'/%3E%3Crect width='5' height='25' transform='matrix(0.707107 -0.707107 -0.707107 -0.707107 18.0103 21.3345)' fill='white'/%3E%3C/svg%3E%0A") center no-repeat}
@media screen and (max-width: 768px) {
    .intro_modal .inner {width:calc(100% - 80px)}
    .intro_modal .inner img {width:100%}
}
</style>