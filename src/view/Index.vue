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
        <el-col>
            <div>
                <span>Hello, {{user.userName}}</span>
                <el-button type="primary" @click="onLoginOut">退出</el-button>
            </div>
            </el-col>
    </el-row>
    <el-tabs v-model="currentTab" type="border-card" @tab-click="tabChange">
        <el-tab-pane label="页面" name="page">
            <el-button @click="gotToEditPage('new')">新建页面</el-button>
                <div style="margin: 0 20px 0 20px;">
                    <el-table :data="currentPageList" >
                        <el-table-column prop="id" label="ID" width="200" />
                        <el-table-column prop="title" label="标题" />
                        <el-table-column label="Operations" width="200">
                            <template #default="scope">
                                <el-button type="text" size="small" @click="gotToPage(scope.row.id)">
                                查看
                                </el-button>
                                <el-button type="text" size="small" v-if="user" @click="gotToEditPage(scope.row.id)">
                                编辑
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        small
                        background
                        layout="prev, pager, next"
                        :page-size="pageSize"
                        :total="pageTotal"
                        @current-change="handleCurrentPageChange"
                    />
                </div>
        </el-tab-pane>
        <el-tab-pane label="文章" name="post">
            <el-button @click="gotToEditPost('new')">新建文章</el-button>
                <div style="margin: 0 20px 0 20px;">
                    <el-table :data="currentPostList" >
                        <el-table-column prop="id" label="ID" width="200" />
                        <el-table-column prop="title" label="标题" />
                        <el-table-column label="Operations" width="200">
                            <template #default="scope">
                                <el-button type="text" size="small" @click="gotToPost(scope.row.id)">
                                查看
                                </el-button>
                                <el-button type="text" size="small" v-if="user" @click="gotToEditPost(scope.row.id)">
                                编辑
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        small
                        background
                        layout="prev, pager, next"
                        :page-size="postSize"
                        :total="postTotal"
                        @current-change="handleCurrentPostChange"
                    />
                </div>
        </el-tab-pane>
        <el-tab-pane label="新闻" name="news">
            <div style="margin: 0 20px 0 20px;">
                <el-table :data="currentNewsList" >
                    <el-table-column prop="id" label="ID" width="200" />
                    <el-table-column prop="postDate" label="日期" />
                    <el-table-column prop="title" label="标题" />
                    <el-table-column label="Operations" width="200">
                        <template #default="scope">
                            <el-button type="default" size="small" @click="showNews(scope.row)">
                            查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    small
                    background
                    layout="prev, pager, next"
                    :page-size="newsSize"
                    :total="newsTotal"
                    @current-change="handleCurrentNewsChange"
                />
            </div>
        </el-tab-pane>
        <el-tab-pane label="报表" name="report" :disabled="!user">
            积木开源报表系统
        </el-tab-pane>
    </el-tabs>
    <Footer></Footer>
    <el-dialog v-model="dialogNewsDetailsVisible" :title="dialogNewsDetails.title" width="30%" draggable>
        <div v-html="dialogNewsDetails.content" style="white-space: pre-line;text-align: initial;">
        </div>
        <template #footer>
        <span class="dialog-footer">
            <el-button type="primary" @click="dialogNewsDetailsVisible = false">Close</el-button>
        </span>
        </template>
    </el-dialog>
</template>
<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import 'prismjs'
import 'prismjs/themes/prism.css'
import Footer from "../components/Footer.vue"
import { pages, posts, news, login } from '../http/api.js'
import { setToken, getUserInfo, setUserInfo, logout } from '../http/store.js'
import { ElNotification } from 'element-plus' 
import { toRaw } from 'vue-demi'

export default {
    name: "index",
    components: {
        Footer
    },
    data() {
        return {
            show: true,
            currentTab: 'page',
            pageList: [],
            pageTotal: 0,
            pageSize: 10,
            currentPageList: [],
            postList: [],
            postTotal: 0,
            postSize: 10,
            currentPostList: [],
            newsSize: 20,
            newsTotal: 0,
            currentNewsList: [],
            dialogNewsDetailsVisible: false,
            dialogNewsDetails: {
                title: '',
                content: ''
            },
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
                this.pageTotal = this.pageList.length
                this.currentPageList = this.pageList.slice(0, 10)
            }
        })
        posts().then(res => {
            if (res.data != null) {
                this.postList = res.data
                this.postTotal = this.postList.length
                this.currentPostList = this.postList.slice(0, 10)
            }
        })
        this.loadNews(0)
    },
    methods: {
        tabChange (tab, evt) {
            const tabValue = toRaw(tab.props)
            if (tabValue.name === 'report') {
                const {href} = this.$router.resolve({path: '/jmreport/list'})
                window.open(href, '_blank')
            }
        },
        handleCurrentPageChange (page) {
            const pageSize = this.pageSize
            this.currentPageList = this.pageList.slice(page * pageSize - pageSize, page * pageSize)
        },
        handleCurrentPostChange (page) {
            const pageSize = this.postSize
            this.currentPostList = this.postList.slice(page * pageSize - pageSize, page * pageSize)
        },
        handleCurrentNewsChange (page) {
            this.loadNews(page)
        },
        loadNews (page) {
            news(page).then(res => {
                this.currentNewsList = res.data.content
                this.newsTotal = res.data.totalElements
                this.newsSize = 20
            })
        },
        showNews (record) {
            this.dialogNewsDetailsVisible = true
            this.dialogNewsDetails = record
        },
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
        },
        onLoginOut: function() {
            logout()
            this.$router.go(0) 
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
