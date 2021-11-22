import { createRouter, createWebHistory } from 'vue-router'
import Index from '../view/Index.vue'
import Page from '../view/Page.vue'
import Post from '../view/Post.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/page',
            name: 'page',
            component: Page
        },
        {
            path: '/post',
            name: 'post',
            component: Post
        },
    ]
})

export default router

