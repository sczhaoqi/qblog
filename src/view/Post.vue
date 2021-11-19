<script>
import Footer from "../components/Footer.vue"
export default {
    name: "page",
    components:{
        Footer
    },
    data(){
        return {
            pNum: 0
        }
    },
    created(){
        console.log(this.$route.query)
        this.pNum = this.$route.query.pNum
    }
}
</script>

<template>
    这是第{{pNum}}篇文章
    <Footer></Footer>
</template>

<style scoped>

</style>
