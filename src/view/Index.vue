<template>
    <el-form v-if="!user" size="mini" :inline="true" :model="loginForm" class="demo-form-inline">
        <el-form-item label="用户">
            <el-input v-model="loginForm.username" placeholder="用户"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>
    <el-row v-if="user">
        <el-col :span="3">Hello, {{user.userName}}</el-col>
    </el-row>
    <el-row>
        <el-col :span="12">
            <div>
                <p>页面</p>
                <ul class="box">
                    <li v-if="user">
                        <el-link type="primary" @click="gotToEditPage('new')">新建页面</el-link>
                    </li>
                    <li v-for="page in pageList" :key="page.id" class="scrollbar-demo-item">
                        {{ '[' + page.id + ']' }}{{ page.title }}
                        <el-link type="primary" @click="gotToPage(page.id)">查看</el-link>
                        <el-link type="primary" @click="gotToEditPage(page.id)" v-if="user">|编辑</el-link>
                    </li>
                </ul>
            </div>
        </el-col>
        <el-col :span="12">
            <div>
                <p>文章</p>
                <ul class="box">
                    <li  v-if="user">
                        <el-link type="primary" @click="gotToEditPost('new')">新建文章</el-link>
                    </li>
                    <li v-for="post in postList" :key="post.id" class="scrollbar-demo-item">
                        {{ '[' + post.id + ']' }}{{ post.title }}
                        <el-link type="primary" @click="gotToPost(post.id)">查看</el-link>
                        <el-link type="primary" @click="gotToEditPost(post.id)" v-if="user">|编辑</el-link>
                    </li>
                </ul>
            </div>
        </el-col>
    </el-row>
    <Footer></Footer>
</template>
<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import 'prismjs'
import 'prismjs/themes/prism.css'
import Footer from "../components/Footer.vue"
import { pages, posts, login } from '../http/api.js'
import { setToken, getUserInfo, setUserInfo } from '../http/store.js'
import { ElNotification } from 'element-plus' 

export default {
    name: "index",
    components: {
	Footer
    },
    data() {
        return {
            show: true,
            pageList: [],
            postList: [],
            loginForm: {
                username: '',
                password: ''
            },
            user: undefined
        }
    },
    mounted() {
        this.user = getUserInfo()
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
        },
        onSubmit: function() {
            login(this.loginForm).then(response => {
                if(response.status === 200){
                    setToken(response.data.token)
                    setUserInfo(response.data.userInfo)
                    location.reload()
                }else{
                    ElNotification({
                        title: 'error',
                        message: '失败',
                        type: 'error',
                    })
                }
            })
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
