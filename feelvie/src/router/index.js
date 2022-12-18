
import {createWebHistory, createRouter} from "vue-router";
import Main from "../components/Main.vue";
import itemDetail from "../components/itemDetail.vue";
import personDetail from "../components/personDetail.vue";
import Search from "../components/Search.vue";
import Ganre from "../components/Ganre.vue";

const routes =  [
  { path: "/", component: Main },
  { path: "/detail/:id", component: itemDetail },
  { path: "/Ganre/:linkValue", name: 'link', component: Ganre},
  { path: "/search", component: Search},
  { path: "/person/:id", component: personDetail}
]

const router = createRouter({
  history :createWebHistory(),
  routes
})

export default router;