<template>
    <el-row>
        <e-col :span="12">
            <div>
                <p>页面</p>
                <ul class="box">
                    <li v-for="page in pageList" :key="page.id" class="scrollbar-demo-item">
                        {{ '[' + page.id + ']' }}{{ page.title }}
                        <el-link type="primary" @click="gotToPage(page.id)">查看</el-link>|
                        <el-link type="primary" @click="gotToEditPage(page.id)">编辑</el-link>
                    </li>
                    <li>
                        <el-link type="primary" @click="gotToEditPage('new')">新建页面</el-link>
                    </li>
                </ul>
            </div>
        </e-col>
        <el-col :span="12">
            <div>
                <p>文章</p>
                <ul class="box">
                    <li v-for="post in postList" :key="post.id" class="scrollbar-demo-item">
                        {{ '[' + post.id + ']' }}{{ post.title }}
                        <el-link type="primary" @click="gotToPost(post.id)">查看</el-link>|
                        <el-link type="primary" @click="gotToEditPost(post.id)">编辑</el-link>
                    </li>
                    <li>
                        <el-link type="primary" @click="gotToEditPost('new')">新建文章</el-link>
                    </li>
                </ul>
            </div>
        </el-col>
    </el-row>
</template>
<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import 'prismjs'
import 'prismjs/themes/prism.css'
import { pages, posts } from '../http/api.js'

export default {
    name: "index",
    components: {
    },
    data() {
        return {
            show: true,
            pageList: [],
            postList: []
        }
    },
    mounted() {
        pages().then(res => {
            if (res.data != null) {
                this.pageList = res.data
            }
        })
        posts().then(res => {
            if (res.data != null) {
                this.postList = res.data
            }
        })

    },
    methods: {
        gotToPage: function (pNum) {
            this.$router.push({ path: '/page', query: { pNum: pNum } })
        },
        gotToEditPage: function (pNum) {
            this.$router.push({ path: '/pageEdit', query: { pNum: pNum } })
        },
        gotToPost: function (pNum) {
            this.$router.push({ path: '/post', query: { pNum: pNum } })
        },
        gotToEditPost: function (pNum) {
            this.$router.push({ path: '/postEdit', query: { pNum: pNum } })
        }
    }

}
</script>

<style scoped>
.box {
    text-align: center;
    text-align: left;
}
</style>
