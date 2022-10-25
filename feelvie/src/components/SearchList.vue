<template>
   <ul class="search_result">
        <li><button type="button" class="title"><span>쇼</span> 미 더 파더</button></li>
        <li><button type="button" class="title">원나잇 호러 <span>쇼</span></button></li>
        <li><button type="button" class="title">위대한 <span>쇼</span></button></li>
        <li><button type="button" class="title">김창옥 <span>쇼</span></button></li>
        <li><button type="button" class="title">분노의 질주- 홉스＆<span>쇼</span></button></li>
        <li><button type="button" class="title">록키 호러 픽쳐 <span>쇼</span></button></li>
        <li><button type="button" class="title">스타일 <span>쇼</span></button></li>
      </ul>
</template>

<script>

export default {
  name: 'item_search',
  data() {
    return {
    };
  },
  methods: {
    
  },
  async mounted() {
  }
}
</script>

<style>
.search_result {padding:40px 20px 0 20px}
.search_result li+li {margin-top:15px}
.search_result li button {color:#fff;font-size:20px;letter-spacing:-1px;border:none;background:none}
.search_result li button span {color:#3A7CDF}

</style>