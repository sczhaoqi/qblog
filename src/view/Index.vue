<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '../components/HelloWorld.vue'
import Tinymce from '../components/Tinymce.vue'
export default {
    name: "index",
    components: {
        HelloWorld,
        Tinymce
    },
    data() {
        return {
            show: true
        }
    },
    methods: {
        gotToPage: function (pNum) {
            this.$router.push({ path: '/page', query: { pNum: pNum } })
        },
        gotToPost: function (pNum) {
            this.$router.push({ path: '/post', query: { pNum: pNum } })
        }
    }
}
</script>

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

    <div>
        <Tinymce id="myedit" ref="editor" v-model="msg" :disabled="disabled" @onClick="onClick" />
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button>
    </div>
</template>
