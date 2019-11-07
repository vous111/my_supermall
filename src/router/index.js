import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("views/home/Home.vue");
const Category = () => import("views/category/Category.vue");
const Profile = () => import("views/profile/Profile.vue");
const Shopcart = () => import("views/shopcart/Shopcart.vue");
const Detail = () => import("views/detail/Detail.vue");

Vue.use(VueRouter);

const routes = [
	{
		path: "",
		redirect: "/home"
	},
	{
		path: "/home",
		component: Home
	},
	{
		path: "/category",
		component: Category
	},
	{
		path: "/profile",
		component: Profile
	},
	{
		path: "/shopcart",
		component: Shopcart
	},
	{
		path: "/detail/:iid",
		component: Detail
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
