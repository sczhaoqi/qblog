<template>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <el-button-group>
        <el-button type="primary" @click="gotToPage(1)">页面1</el-button>
        <el-button type="primary" @click="gotToPage(2)">页面2</el-button>
        <el-button type="primary" @click="gotToPage(3)">页面3</el-button>
    </el-button-group>

    <el-button-group>
        <el-button type="primary" @click="gotToPost(1)">文章1</el-button>
        <el-button type="primary" @click="gotToPost(2)">文章2</el-button>
        <el-button type="primary" @click="gotToPost(3)">文章3</el-button>
    </el-button-group>
    <div contenteditable=true v-html="content" disabled></div>
    <div>
        <TinymceEditor :config="setting" :content="content" @content-change="contentChange" />
    </div>
    <el-button @click="showContent()">Console</el-button>
    <el-button @click="clear()">清空内容</el-button>
    <el-button @click="disabled()">禁用</el-button>
</template>
<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import 'prismjs'
import 'prismjs/themes/prism.css'
import HelloWorld from '../components/HelloWorld.vue'
import TinymceEditor from '../components/TinymceEditor.vue';

import { updatePage } from '../http/api.js'

export default {
    name: "index",
    components: {
        HelloWorld,
        TinymceEditor
    },
    data() {
        return {
            show: true,
            title: 'test page',
            content: 'hello vue3-tinymce!',
            // editor 配置项
            setting: {
                height: 400 // editor 高度
            },
        }
    },
    methods: {
        contentChange: function(data) {
            console.log(data)
            this.content = data
        },
        showContent(){
            console.log(this)
            console.log(this.content)
            updatePage({id:1, title: this.title}).then(res => {
                console.log(res)
            })
        },
        gotToPage: function (pNum) {
            this.$router.push({ path: '/page', query: { pNum: pNum } })
        },
        gotToPost: function (pNum) {
            this.$router.push({ path: '/post', query: { pNum: pNum } })
        }
    }
}
</script>

