<template>
	<div id="editor-content-textarea">{{ content }}</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import store from '@/store'
import { useRouter, useRoute } from 'vue-router'
import service from '@/utils/request'

const router = useRouter()
const route = useRoute()

const data = ref({ content: '', id: 0 })
const content = ref('')
const id = ref()

const getOneOrLatest = (id: number | undefined) => {
	if (id) {
		service.get('/blog/page/' + id).then(res => {
			data.value = res.data
			content.value = data.value.content
		})
	} else {
		service.get('/blog/page/latest').then(res => {
			if (res) {
				data.value = res.data
				id = data.value.id
				content.value = data.value.content
			}
		})
	}
}
onMounted(() => {
	id.value = router.currentRoute.value.query.id
	getOneOrLatest(id.value)
})
</script>
