<template>
    <div>{{ msg }}:{{ details }}</div>
    <router-link to="/">返回首页</router-link>
</template>
<script>
export default {
    created() {
        this.type = this.$route.query.type
        console.log(this.$route)
        switch (this.type) {
            case 'page':
                this.details = '页面不存在'
                break;
            default:
                this.details = '无法访问'
                break;
        }
    },
    data() {
        return {
            type: '',
            msg: '未知位置',
            details: ''
        }
    }
}
</script>
