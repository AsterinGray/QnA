import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import HomeView from "../views/HomeView.vue";

export enum ROUTES_NAME {
  HOME = "HOME",
  ABOUT = "ABOUT",
  QUESTION_DETAIL = "QUESTION_DETAIL",
  SIGNUP = "SINGUP",
  LOGIN = "LOGIN",
  PROFILE = "PROFILE",
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: ROUTES_NAME.HOME,
    component: HomeView,
  },
  {
    path: "/about",
    name: ROUTES_NAME.ABOUT,
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/question/:id",
    name: ROUTES_NAME.QUESTION_DETAIL,
    component: () => import("@/views/QuestionDetailView.vue"),
  },
  {
    path: "/signup",
    name: ROUTES_NAME.SIGNUP,
    meta: { toAuth: true },
    component: () => import("@/views/auth/SignupView.vue"),
  },
  {
    path: "/login",
    name: ROUTES_NAME.LOGIN,
    meta: { toAuth: true },
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/profile",
    name: ROUTES_NAME.PROFILE,
    meta: { requiresAuth: true },
    component: () => import("@/views/ProfileView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.auth.isAuthenticate) {
    next({ name: ROUTES_NAME.LOGIN });
  } else if (to.meta.toAuth && store.state.auth.isAuthenticate) {
    next({ name: ROUTES_NAME.PROFILE });
  } else {
    next();
  }
});

export default router;
