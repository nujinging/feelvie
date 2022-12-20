<template>
  <header class="wrap_header">
    <div class="header_container">
      <div class="navigation">
        <router-link to="/" class="logo">
          <img src="https://www.tving.com/img/tving-new-logo-pc.svg" alt="">
        </router-link>
        <ul class="menu">
          <li>
            <router-link :to="{ name: 'link', params: { linkValue: 'movie' }}">영화</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'link', params: { linkValue: 'tv' }}">TV 프로그램</router-link>
          </li>
          <li>
            <router-link to="/person/">인물</router-link>
          </li>
        </ul>
      </div>

      <router-link to="/search" class="search">
        <span class="blind">검색</span>
      </router-link>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header_',
}
</script>

<style>
.wrap_header {position:sticky;top:0;width:100%;background:#000;z-index:9999}
.wrap_header .header_container {padding:20px 32px;display:flex;align-items:center;justify-content:space-between;}
.wrap_header .navigation {display:flex;align-items:center;margin-left:35px}
.wrap_header .menu {display:flex;align-items:center;margin-left:35px}
.wrap_header .menu li a {color:#fff;font-size:22px;font-weight:bold;line-height:20px}
.wrap_header .search {display:inline-block;width:50px;height:50px;background:url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Crect width='32' height='32' fill='url(%23pattern0)'/%3E%3Cdefs%3E%3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_12_305' transform='scale(0.03125)'/%3E%3C/pattern%3E%3Cimage id='image0_12_305' width='32' height='32' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB2klEQVRYhe2WO0vEQBSF7wRLSwmyyGItVmJtoY1YiMgW1oIoYiEisv9EtrCwsLMVK3+F4GIhYieoWIjI4uOzmBHD3Ukyk6zaeCHFTvac881kXkYKCkhFpCUicyIyISKpe3UvIhciciYix8aY2yKf6AJSoAP0KK8ecAA0BhW+ANwFBOt6BJbqhq8C7xXCv+od2KjTc1/4FbAHTAMj7pkCdoHLHIjl2PCU/mF/BdrAUIFuCNihf648EjMnsBNOhy9G6Oc9EIeh4tQjbgfTf/tsezoxFiLcVMKromEv8EmArvLaKdMlYjeZbHWMMW+xAMaYDxHZV83au7881NOx4RmvSeV1HSJ6UKKRGgDDyuu5TJNUDcupj1hBIvZgyVazBsC4+q29vQAXqm22BoDWam8vwJlqW6u6DEVkXTVrb69w1LMRla5fj4/eT16BsM+JPc+z1QPmI8JngRflcRRD38AeIBpi2w1tni5xPdfhT8G9z5gt4T+Ouw5kErvOh4EJYAs49/z/a/hXogAcxEYORJWqDLFM/+cIqScXOhCIBnDoMczr6RHQBFYGBuFAxrA3nhPgGnh2zw1wir2WNZVmsBAVwf8h/iFCIVp/DVF+ZfthiO6vAjiIFnZP6QIzn9TA/Qx6PEfbAAAAAElFTkSuQmCC'/%3E%3C/defs%3E%3C/svg%3E%0A") center no-repeat}
.wrap_header .menu li+li {margin-left:20px}
@media (max-width: 767px) {
  .wrap_header {margin:0 15px;padding:10px 0}
  .wrap_header .logo {width:70px}
  .wrap_header .logo img {width:100%}
  .wrap_header .menu {margin-left:20px}
  .wrap_header .menu li a {font-size:18px}
  .wrap_header .menu li+li a {margin-left:8px}
}
</style>