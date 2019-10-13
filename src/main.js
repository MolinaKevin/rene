import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import App from './App.vue'
import Post from './components/Post.vue'
import Hello from './components/Hello.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

const router = new Router({
    routes: [
        {
            path: '/',
            name:'home',
            component: Hello,
        },
        {
            path: '/post/:id',
            name:'post',
            component: Post,
            props: true,
        },
    ],
    mode: 'history'
})

new Vue({
    el: '#app',
    render: h => h(App),
    router
})