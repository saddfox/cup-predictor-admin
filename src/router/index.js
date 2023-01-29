import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import Home from "../views/Home.vue";
import Format1Results from "../views/Format1Results.vue";
import Format2Results from "../views/Format2Results.vue";
import AddNewCup from "../views/AddNewCup.vue";
import { useMainStore } from "../stores/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/results1",
      name: "results1",
      component: Format1Results,
      beforeEnter: (to, from) => {
        if (from.name !== "home") {
          return { name: "home" };
        }
      },
    },
    {
      path: "/results2",
      name: "results2",
      component: Format2Results,
      beforeEnter: (to, from) => {
        if (from.name !== "home") {
          return { name: "home" };
        }
      },
    },
    {
      path: "/new",
      name: "new",
      component: AddNewCup,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const mainStore = useMainStore();

  if (
    // make sure the user is authenticated
    (mainStore.expiry === null ||
      mainStore.expiry < Date.now() / 1000 + 1800) &&
    // ❗️ Avoid an infinite redirect
    to.name !== "login"
  ) {
    // redirect the user to the login page
    console.log("redirecting, not logged in");
    return { name: "login" };
  }
});

export default router;
