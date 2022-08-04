<template>
	<div>
		<el-row>
			<el-col>
				<el-input v-model="title" placeholder="标题"></el-input>
			</el-col>
		</el-row>
		<WangEditor v-model="content" style="height: 720px" placeholder="请输入..."></WangEditor>
		<el-row>
			<el-col style="text-align: end; margin: 10px 0"><el-button type="primary" @click="saveOrUpdate">保存</el-button></el-col>
		</el-row>
		<!--		<WangEditor v-model="editorValue2" :disabled="true" placeholder=""></WangEditor>-->
	</div>
</template>

<script lang="ts" setup name="DemoWangeditorIndex">
import WangEditor from '@/components/wang-editor/index.vue'
import { ref, onMounted } from 'vue'
import service from '@/utils/request'

import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const data = ref({ content: '', id: undefined, title: '' })
const title = ref('')
const content = ref('')
const id = ref(-1)

const getOne = (id: number | undefined) => {
	if (id) {
		service.get('/blog/post/' + id).then(res => {
			data.value = res.data
			title.value = data.value.title
			content.value = data.value.content
		})
	}
}
const saveOrUpdate = () => {
	if (id.value === -1) {
		service
			.post('/blog/post', {
				title: title.value,
				content: content.value
			})
			.then(res => {
				if (res) {
					ElMessage.success('创建成功')
					router.push('/site/post/post/')
				}
			})
	} else {
		service
			.put('/blog/post', {
				id: id.value,
				title: title.value,
				content: content.value
			})
			.then(res => {
				if (res) {
					ElMessage.success('更新成功')
					router.push('/site/post/post/')
				}
			})
	}
}
onMounted(() => {
	if (router.currentRoute.value.query.id) {
		id.value = Number(router.currentRoute.value.query.id)
	}
	getOne(id.value)
})
</script>

