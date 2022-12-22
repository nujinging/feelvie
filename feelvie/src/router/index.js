
import {createWebHistory, createRouter} from "vue-router";
import Main from "../components/Main.vue";
import itemDetail from "../components/itemDetail.vue";
import personList from "../components/personList.vue";
import personDetail from "../components/personDetail.vue";
import Search from "../components/Search.vue";
import Ganre from "../components/Ganre.vue";

const routes =  [
  { path: "/", component: Main },
  { path: "/:type/:id", name:'work', component: itemDetail,props: true },
  { path: "/Ganre/:linkValue", name: 'link', component: Ganre, props: true},
  { path: "/search", component: Search},
  { path: "/person", component: personList},
  { path: "/person/:id", component: personDetail}
]

// 라우터 이동 시 스크롤 최상단
const router = createRouter({
  history :createWebHistory(),
  scrollBehavior(){
    return { top: 0 }
  },
  routes
})

export default router;