import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

const pages = [
	{
		path: "/login",
		component: () => import("@/components/MyLogin/MyLogin.vue"),
	},
	{
		path: "/monitor/",
		component: () => import("@/components/MyMonitor/MyMonitor.vue"),
	},
	{
		path: "/monitor-control/",
		component: () => import("@/components/MyMonitor/MyMonitor.vue"),
	},
	{
		path: "/funnel/",
		component: () => import("@/components/MyAnalytic/MyAnalytic.vue"),
	},
	{
		path: "/funnel/traffic/",
		component: () => import("@/components/MyAnalytic/MyAnalytic.vue"),
	},
	{
		path: "/funnel/additional/",
		component: () => import("@/components/MyAnalytic/MyAnalytic.vue"),
	},
	{
		path: "/settings-contracts/",
		component: () => import("@/components/MySettings/MyContracts/MyContracts.vue"),
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes: pages,
});
