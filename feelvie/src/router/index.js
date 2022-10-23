
import {createWebHistory, createRouter} from "vue-router";
import Main from "../components/Main.vue";
import itemDetail from "../components/itemDetail.vue";


const routes =  [
  { path: "/", component: Main },
  { path: "/detail/:id", component: itemDetail },
]

const router = createRouter({
  history :createWebHistory(),
  routes
})

export default router;