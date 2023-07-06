import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Surveys from "../views/Surveys.vue";
import SurveyView from "../views/SurveyView.vue";
import Store from '../store/store.js'

const routes =  [
    {
        path: '/',
        redirect : '/dashboard',
        component: DefaultLayout,
        meta : { requiresAuth : true},
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/surveys',
                name: 'Surveys',
                component: Surveys
            },
            {
                path: '/surveys/create',
                name: 'surveyCreate',
                component: SurveyView
            },
            {
                path: '/surveys/:id',
                name: 'SurveyView',
                component: SurveyView
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !Store.state.user.token) {
        next({name: 'Login'});
    }
    else if(Store.state.user.token && (to.name === 'Register' || to.name === 'Login')){
        next({name: 'Dashboard'});
    }
    else{
        next();
    }
});

export default router;
