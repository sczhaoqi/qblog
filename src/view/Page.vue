<script>
import 'prismjs'
import 'prismjs/themes/prism.css'
import Footer from "../components/Footer.vue"
import { findPage } from '../http/api.js'

export default {
    name: "page",
    components: {
        Footer
    },
    data() {
        return {
            pNum: 0,
            updating: false,
            page: {
                id: 1,
                content: '',
                title: ''
            }
        }
    },
    created() {
        this.pNum = this.$route.query.pNum
        findPage({ id: this.pNum })
            .then((res) => {
                if (res.status === 200 && res.data) {
                    this.page = res.data
                } else {
                    this.$router.push({ path: '/404', query: { type: 'page' } })
                }
            })
    },
    methods: {
        update() {
            this.$router.push({ path: '/pageEdit', query: { pNum: this.pNum } })
        },
    }
}
</script>

<template>
    <div contenteditable="true" v-html="page.content" disabled></div>
    <el-button @click="update()">编辑</el-button>
    <Footer></Footer>
</template>

<style scoped>
</style>
