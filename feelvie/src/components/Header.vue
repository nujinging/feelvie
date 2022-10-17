<template>
  <header class="wrap_header">
    <a href="" class="logo">
      <img src="https://www.tving.com/img/tving-new-logo-pc.svg" alt="">
    </a>
    <ul class="navigation">
      <li>
        <a href="detail.html">영화</a>
      </li>
      <li>
        <a href="">TV프로그램</a>
      </li>
      <li>
        <a href="">인물</a>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  name : 'Header_',
}
</script>

<style>
.wrap_header {position:fixed;top:0;display:flex;align-items:center;margin:0 32px;padding:20px 0;width:100%}
.wrap_header .navigation {display:flex;align-items:center;margin-left:35px}
.wrap_header .navigation li a {color:#fff;font-size:22px;font-weight:bold;line-height:20px}
.wrap_header .navigation li+li {margin-left:20px}
@media (max-width: 767px) {
  .wrap_header {margin:0 15px;padding:10px 0}
  .wrap_header .logo {width:70px}
  .wrap_header .logo img {width:100%}
  .wrap_header .navigation {margin-left:20px}
  .wrap_header .navigation li a {font-size:18px}
  .wrap_header .navigation li+li a {margin-left:8px}
}
</style>