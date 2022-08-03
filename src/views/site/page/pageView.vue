<template>
	<div id="view_box">
		<div id="view_control_box">
			<div id="view_control_content">
				<el-row justify="space-around">
					<el-col :span="2"><el-button :icon="ArrowLeftBold">上一篇</el-button></el-col>
					<el-col :span="2"><el-button :icon="HomeFilled">首页</el-button></el-col>
					<el-col :span="2"><el-button :icon="ArrowRightBold">下一篇</el-button></el-col>
				</el-row>
			</div>
		</div>
		<div id="view_title">
			<div id="view_title_content" v-html="title"></div>
		</div>
		<div id="view_main">
			<div id="view_main_content" class="main_content" v-html="content"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { HomeFilled, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import service from '@/utils/request'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const data = ref({ content: '', id: 0, title: '' })
const title = ref('')
const content = ref('')
const id = ref()

const getOneOrLatest = (id: number | undefined) => {
	if (id) {
		service.get('/blog/page/' + id).then(res => {
			data.value = res.data
			title.value = data.value.title
			content.value = data.value.content
		})
	} else {
		service.get('/blog/page/latest').then(res => {
			if (res) {
				data.value = res.data
				id = data.value.id
				content.value = data.value.content
				title.value = data.value.title
			}
		})
	}
}

onMounted(() => {
	id.value = router.currentRoute.value.query.id
	getOneOrLatest(id.value)
})

</script>

<style>
@import '../site.css';
</style>
