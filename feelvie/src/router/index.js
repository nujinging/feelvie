
import {createWebHistory, createRouter} from "vue-router";
import Main from "../components/Main.vue";
import MovieDetail from "../components/MovieDetail.vue";


const routes =  [
  { path: "/", component: Main },
  { path: "/:id", component: MovieDetail },
]

const router = createRouter({
  history :createWebHistory(),
  routes
})

export default router;