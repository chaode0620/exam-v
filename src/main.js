import Vue from 'vue'
import { NavBar, Cell, CellGroup, RadioGroup, Radio, Checkbox, CheckboxGroup, Button, Divider, NoticeBar } from 'vant'
import Layout from './layout'
import router from './router'
import store from './store'
import './global.css'

Vue.config.productionTip = false
Vue
	.use(NavBar)
	.use(Cell).use(CellGroup)
	.use(RadioGroup).use(Radio)
	.use(CheckboxGroup).use(Checkbox)
	.use(Button)
	.use(Divider)
	.use(NoticeBar)

new Vue({
	router,
	store,
	render: h => h(Layout)
}).$mount('#app')
