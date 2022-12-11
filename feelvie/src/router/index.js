
import {createWebHistory, createRouter} from "vue-router";
import Main from "../components/Main.vue";
import itemDetail from "../components/itemDetail.vue";
import Search from "../components/Search.vue";
import Genre from "../components/Genre.vue";

const routes =  [
  { path: "/", component: Main },
  { path: "/detail/:id", component: itemDetail },
  { path: "/genre", name: 'genre', component: Genre},
  { path: "/search", component: Search},
  { path: "/search", }
]

const router = createRouter({
  history :createWebHistory(),
  routes
})

export default router;