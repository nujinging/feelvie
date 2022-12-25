<template>
    <div class="intro_modal">
        <div class="inner">
            모달
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
    methods: {

    },

}
</script>

<style>
.intro_modal {position:fixed;top:0;left:0;z-index:600}
.intro_modal:before  {position:fixed;top:0;left:0;width:100%;height:100%;background:#000000a1;content:''}
.intro_modal .inner {position:fixed;top:50%;left:50%;padding:20px;width:500px;color:#fff;border-radius:20px;background:radial-gradient(at 25% top, #32112c 0%, #0a1526 40%);transform:translate(-50%, -50%);}
</style>