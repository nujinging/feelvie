<template>
  <div class="title">
    <h2>인기있는 콘텐츠</h2>
    <select name="" id="" class="type_select">
      <option value="">스트리밍</option>
      <option value="">TV</option>
      <option value="">대여</option>
      <option value="">극장</option>
    </select>
    <ul class="type_list">
      <li>
        <button type="button" class="active">스트리밍</button>
      </li>
      <li>
        <button type="button">TV</button>
      </li>
      <li>
        <button type="button">대여</button>
      </li>
      <li>
        <button type="button">극장</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Title_',
}
</script>

<style>
.title {display:flex;align-items:center;margin-bottom:30px}
.title h2 {color:#fff;font-size:26px;font-weight:bold}
.title .type_list {display:flex;align-items:center;margin-left:1.042vw}
.title .type_list li+li {margin-left:10px} 
.title .type_list li button {padding:6px 15px;color:#fff;font-size:16px;line-height:20px;border:1px solid #fff;border-radius:50px;background:#000}
.title .type_list li button.active {color:#000;border-color:#000;background:#fff}
.title .type_select {display:none;margin-left:20px;color:#fff;font-size:16px;border:none;background:none}
.title .type_select option {color:#000}
@media (max-width: 767px) {
  .title {margin-bottom:15px}
  .title h2 {font-size:20px}
  .title .type_list {display:none;margin:8px 0 0 0}
  .title .type_list li button {padding:4px 12px;font-size:14px}
  .title .type_select {display:block}
  .title .type_select option {color:#000}
}
</style>