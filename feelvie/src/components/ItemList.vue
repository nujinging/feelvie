<template>
  <div class="item_container">
    <Title></Title>
    <ItemCard></ItemCard>
  </div>
</template>
<script>
import Title from './Title.vue'
import ItemCard from './ItemCard.vue'

export default {
  name: 'Item_List',
  components: {
    Title,
    ItemCard
  },
}
</script>

<style>
.item_card {width:220px}
.item_card picture {display:block;height:330px;background:#fff}
.item_card picture img {width:100%}
.item_card h3 {margin-top:10px;color:#fff;font-size:16px}
@media (max-width: 767px) {
  .swiper-slide {width:120px}
  .item_card picture {width:120px;height:180px}
}
</style>