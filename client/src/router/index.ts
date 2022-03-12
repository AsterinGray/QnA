import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const ROUTES_NAME = {
  HOME: "HOME",
  ABOUT: "ABOUT",
  QUESTION_DETAIL: "QUESTION_DETAIL",
  SIGNUP: "SINGUP",
  LOGIN: "LOGIN",
};

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
    component: () => import("@/views/auth/SignupView.vue"),
  },
  {
    path: "/login",
    name: ROUTES_NAME.LOGIN,
    component: () => import("@/views/auth/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
