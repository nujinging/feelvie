<template>
  <Header></Header>
  <div class="container">
      <ItemCard :movieList="nowPlaying"></ItemCard>
      <ItemList :movieList="nowPlaying"></ItemList>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ItemCard from './components/ItemCard.vue'
import ItemList from './components/ItemList.vue'
import { movieApi } from './utils/axios';

export default {
  name: 'App',
  data() {
    return {
      nowPlaying: {},
    }
  },
  components: {
    Header,
    ItemCard,
    ItemList,
  },
  async mounted() {
   const { data } = await movieApi.nowPlaying();
      console.log(data.results);
      this.movieList = data.results;
      console.log(this.movieList);

      const { nowPlaying } = movieApi;
      const requestArr = [nowPlaying];
      const [now] = await Promise.all(
        requestArr.map((li) => li().then((res) => res.data.results))
      );

      this.nowPlaying = now;
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
html { font-family: 'Noto Sans KR', sans-serif;}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {margin: 0;padding: 0;border: 0;font-size: 100%;vertical-align: baseline;}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {display: block;}
body {line-height: 1;}
ol, ul {list-style: none;}
button {cursor:pointer;}
a {color:initial;text-decoration:none}
blockquote, q {quotes: none;}
blockquote:before, blockquote:after,
q:before, q:after {content: '';content: none;}
table {border-collapse: collapse;border-spacing: 0;}
body {background:#000}

.container {margin-top:69px}
.container .item_container {padding:3.125vw 0 0 3.125vw}
.container .item_container+.item_container {margin-top:30px}
</style>
