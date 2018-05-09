import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import workflow from '../views/workflow.vue'
Vue.use(Router);
export default new Router({
    routes: [
        { path: '/', name: 'default', component: index },
        { path: '/workflow/:uid', name: 'workflow', component: workflow }
    ]
});