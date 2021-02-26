import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
	path: '/',
	component: () => import('../views/Home'),
	meta: { title: '首页' }
}, {
	path: '/main',
	component: () => import('../views/Main'),
	meta: { title: '题库练习' }
}]

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes
})

export default router
