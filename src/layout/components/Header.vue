<template>
	<el-row v-show="router.currentRoute.value.fullPath.indexOf('/site') === -1" justify="end" style="margin: 20px 0">
		<el-col :span="12">
			<el-button-group>
				<el-button type="primary" @click="toPage"> 页面</el-button>
				<el-button type="primary" @click="toPost">文章</el-button>
				<el-button type="primary" @click="toXinwen">新闻</el-button>
			</el-button-group>
		</el-col>
		<el-col :span="3">
			<el-button type="primary" @click="toLogin">登录</el-button>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useCrud } from '@/hooks'
import { IHooksOptions } from '@/hooks/interface'

import store from '@/store'

import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

onMounted(() => {
	// 1
})

const toLogin = () => {
	router.push('/login')
}
const toPage = () => {
	router.push('/page')
}
const toPost = () => {
	router.push('/post')
}
const toXinwen = () => {
	router.push('/xinwen')
}
</script>
