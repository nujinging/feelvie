<template>
  <Header></Header>
  <div class="container">
    <section class="detail_container">
      <div class="detail_info">
        ss
      </div>
      <div class="detail_poster">
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
    };
  },
  methods: {
  },
  async mounted() {
    // 인물 ID값에 따른 정보
    const { id } = this.$route.params;
    const { data } = await movieApi.personDetail(id);
    this.personDetail = data;
  },
}
</script>
<style></style>

