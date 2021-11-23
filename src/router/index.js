import { createRouter, createWebHistory } from 'vue-router'
import Index from '../view/Index.vue'
import Page from '../view/Page.vue'
import Post from '../view/Post.vue'
import PageEdit from '../view/PageEdit.vue'
import PostEdit from '../view/PostEdit.vue'
import NotFound from '../view/404.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/404',
            name: '404',
            component: NotFound
        },
        {
            path: '/index',
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
        {
            path: '/pageEdit',
            name: 'pageEdit',
            component: PageEdit
        },
        {
            path: '/postEdit',
            name: 'postEdit',
            component: PostEdit
        },
    ]
})

export default router

