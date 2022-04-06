<script>
import 'prismjs'
import 'prismjs/themes/prism.css'
import Footer from "../components/Footer.vue"
import { findPost } from '../http/api.js'
import { getUserInfo } from '../http/store.js'

export default {
    name: "post",
    components: {
        Footer
    },
    data() {
        return {
            pNum: 0,
            updating: false,
            post: {
                id: 1,
                content: '',
                title: ''
            },
            user: undefined
        }
    },
    created() {
        this.user = getUserInfo()
        this.pNum = this.$route.query.pNum
        findPost({ id: this.pNum })
            .then((res) => {
                if (res.status === 200 && res.data) {
                    this.post = res.data
                } else {
                    this.$router.push({ path: '/404', query: { type: 'post' } })
                }
            })
    },
    methods: {
        update() {
            this.$router.push({ path: '/postEdit', query: { pNum: this.pNum } })
        },
    }
}
</script>

<template>
    <div contenteditable="true" v-html="post.content" disabled></div>
    <el-button @click="update()"  v-if="user">编辑</el-button>
    <Footer></Footer>
</template>

<style scoped>
</style>
