<template>
	<div id="view_box">
		<div id="view_control_box">
			<div id="view_control_content">
				<el-row justify="space-around">
					<el-col :span="2"><el-button :icon="ArrowLeftBold" :disabled="!preNext.hasPre" @click="jumpTo('pre')">上一篇</el-button></el-col>
					<el-col :span="2"><el-button :icon="HomeFilled" @click="toHome">首页</el-button></el-col>
					<el-col :span="2"><el-button :icon="ArrowRightBold" :disabled="!preNext.hasNext" @click="jumpTo('next')">下一篇</el-button></el-col>
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
const preNext = ref({ pre: { id: 0 }, next: { id: 0 }, hasNext: false, hasPre: false })
const id = ref()

const viewSite = ref(true)

const toHome = () => {
	router.push('/home')
}
const getPreNext = (id: number | undefined) => {
	if (id) {
		service.get('/blog/post/preNext/' + id).then(res => {
			preNext.value = res.data
		})
	}
}
const jumpTo = (type: string) => {
	const toPath = viewSite.value ? '/postView' : '/site/post/postView'
	switch (type) {
		default:
		case 'pre':
			getOneOrLatest(preNext.value.pre.id)
			router.replace({ path: toPath, query: { id: preNext.value.pre.id } })
			getPreNext(preNext.value.pre.id)
			break
		case 'next':
			getOneOrLatest(preNext.value.next.id)
			router.replace({ path: toPath, query: { id: preNext.value.next.id } })
			getPreNext(preNext.value.next.id)
			break
	}
}
const getOneOrLatest = (id: number | undefined) => {
	if (id) {
		service.get('/blog/post/' + id).then(res => {
			data.value = res.data
			title.value = data.value.title
			content.value = data.value.content
		})
	} else {
		service
			.get('/blog/post/latest')
			.then(res => {
				if (res) {
					data.value = res.data
					id = data.value.id
					content.value = data.value.content
					title.value = data.value.title
				}
			})
			.then(() => {
				getPreNext(data.value.id)
			})
	}
}

onMounted(() => {
	id.value = router.currentRoute.value.query.id
	viewSite.value = router.currentRoute.value.fullPath.indexOf('/site') === -1
	getOneOrLatest(id.value)
	getPreNext(id.value)
})
</script>

<style>
@import '../site.css';
</style>

