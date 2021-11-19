<script>
import Footer from "../components/Footer.vue"
export default {
    name: "page",
    components: {
        Footer
    },
    data() {
        return {
            pNum: 0
        }
    },
    created() {
        console.log(this.$route.query)
        this.pNum = this.$route.query.pNum
    }
}
</script>

<template>
    <div>这是第{{ pNum }}页</div>
    <Footer></Footer>
</template>

<style scoped>
</style>
