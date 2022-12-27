<template>
  <Header></Header>
  <!-- 페이지 내부에서 params의 값만 바뀌더라도 해당 페이지가 재렌더링 될 수 있게끔 한다-->
  <router-view :key="$route.fullPath"/>
</template>

<script>
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
    }
  },
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
* {box-sizing:border-box}
html { font-family: 'Noto Sans KR', sans-serif;font-size:16px}
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
button {border:none}
body {color:#fff;background:#000}
.blind {overflow:hidden;clip:rect(1px,1px,1px,1px);position:absolute !important;width:1px;height:1px}

@media screen and (min-width: 1200px) {
  html {
    font-size: calc(6px + .5vw);
  }
}

@media screen and (min-width: 768px) {
  html {
    font-size: calc(6px + .5vw);
  }

}

@media screen and (max-width: 768px) {
  html {
    font-size: calc(6px + .5vw);
  }
}
.title {display:flex;align-items:center;margin-bottom:1.875rem}
.title h2 {color:#fff;font-size:1.875rem;font-weight:bold;line-height:2.5rem}
@media screen and (max-width: 768px) {
  .title h2 {font-size:2.125rem}
}
</style>
