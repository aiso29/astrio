import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'

import vBasket from '@/components/vBasket.vue';
import vMain from '@/components/vMain.vue';

Vue.use(VueRouter)

export const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/basket',
			name: 'basket',
			component: vBasket
		},
		{
			path: '/',
			name: 'main',
			component: vMain
		}
	]
})

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
