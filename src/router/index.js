import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const login = r =>
  require.ensure([], () => r(require("@/page/login")), "login");
const manage = r =>
  require.ensure([], () => r(require("@/page/manage")), "manage");
const nodeLook = r =>
  require.ensure([], () => r(require("@/page/nodeLook")), "nodeLook");
const announcementCenter = r =>
  require.ensure(
    [],
    () => r(require("@/page/announcementCenter")),
    "announcementCenter"
  );
const home = r => require.ensure([], () => r(require("@/page/home")), "home");
const uncashList = r =>
  require.ensure([], () => r(require("@/page/uncashList")), "uncashList");
const extractedcashList = r =>
  require.ensure(
    [],
    () => r(require("@/page/extractedcashList")),
    "extractedcashList"
  );

const routes = [
  {
    path: "/",
    component: login
  },
  {
    path: "/manage",
    component: manage,
    name: "",
    children: [
      {
        path: "",
        component: home,
        meta: []
      },
      {
        path: "/announcementCenter",
        component: announcementCenter,
        meta: ["公告中心"]
      },
      {
        path: "/nodeLook",
        component: nodeLook,
        meta: ["节点查看"]
      },
      {
        path: "/uncashList",
        component: uncashList,
        meta: ["有效支票列表"]
      }
      // {
      //   path: "/extractedcashList",
      //   component: extractedcashList,
      //   meta: ["有效支票列表", "已提取支票"]
      // }
    ]
  }
];

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== "production"
});
