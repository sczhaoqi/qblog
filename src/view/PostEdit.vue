<script>
import 'prismjs'
import 'prismjs/themes/prism.css'
import Footer from "../components/Footer.vue"
import { findPost, updatePost } from '../http/api.js'
import { ElNotification } from 'element-plus'

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
            }
        }
    },
    created() {
        this.pNum = this.$route.query.pNum
        if (this.pNum === 'new') {
            this.post.id = undefined
            this.updating = true
        } else {
            findPost({ id: this.pNum })
                .then((res) => {
                    if (res.status === 200 && res.data) {
                        this.post = res.data
                    } else {
                        this.$router.push({ path: '/404', query: { type: 'post' } })
                    }
                })
        }
    },
    methods: {
        contentChange: function (data) {
            let _this = this
            _this.post.content = data
        },
        update() {
            updatePost(this.post)
                .then((res) => {
                    ElNotification({
                        title: 'Success',
                        message: '成功',
                        type: 'success',
                    })
                    this.pNum = res.data
                }).then(() =>
                    findPost({ id: this.pNum })
                ).then((res) => {
                    this.post = res.data
                })
        },
    }
}
</script>

<template>
    <div v-if="!updating" contenteditable="true" v-html="post.content" disabled></div>

    <el-switch v-model="updating" active-text="编辑" inactive-text="查看" />
    <div>
        <div>
            <el-input v-model="post.title" placeholder="Please Input" />
            <TinymceEditor
                :config="setting"
                :content="post.content"
                @content-change="contentChange"
            />
        </div>
        <el-button @click="update()">更新</el-button>
    </div>

    <Footer></Footer>
</template>

<style scoped>
</style>
