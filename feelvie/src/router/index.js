
import {createWebHistory, createRouter} from "vue-router";
import Main from "../components/Main.vue";
import itemDetail from "../components/itemDetail.vue";
import Search from "../components/Search.vue";


const routes =  [
  { path: "/", component: Main },
  { path: "/detail/:id", component: itemDetail },
  { path: "/search", component: Search}
]

const router = createRouter({
  history :createWebHistory(),
  routes
})

export default router;