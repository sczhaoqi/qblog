<script>
import 'prismjs'
import 'prismjs/themes/prism.css'
import Footer from "../components/Footer.vue"
import { findPage, updatePage } from '../http/api.js'
import { ElNotification } from 'element-plus'

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
        if (this.pNum === 'new') {
            this.page.id = undefined
            this.updating = true
        } else {
            findPage({ id: this.pNum })
                .then((res) => {
                    if (res.status === 200 && res.data) {
                        this.page = res.data
                    } else {
                        this.$router.push({ path: '/404', query: { type: 'page' } })
                    }
                })
        }
    },
    methods: {
        contentChange: function (data) {
            let _this = this
            _this.page.content = data
        },
        update() {
            updatePage(this.page)
                .then((res) => {
                    ElNotification({
                        title: 'Success',
                        message: '成功',
                        type: 'success',
                    })
                    this.pNum = res.data
                }).then(() =>
                    findPage({ id: this.pNum })
                ).then((res) => {
                    this.page = res.data
                })
        },
    }
}
</script>

<template>
    <div v-if="!updating" contenteditable="true" v-html="page.content" disabled></div>

    <el-switch v-model="updating" active-text="编辑" inactive-text="查看" />
    <div>
        <div>
            <el-input v-model="page.title" placeholder="Please Input" />
            <TinymceEditor
                :config="setting"
                :content="page.content"
                @content-change="contentChange"
            />
        </div>
        <el-button @click="update()">更新</el-button>
    </div>

    <Footer></Footer>
</template>

<style scoped>
</style>
