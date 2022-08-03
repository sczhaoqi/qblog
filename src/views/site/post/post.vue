<template>
	<Header></Header>
	<el-table
		v-loading="state.dataListLoading"
		:data="state.dataList"
		border
		style="width: 100%"
		@selection-change="selectionChangeHandle"
		@sort-change="sortChangeHandle"
	>
		<!-- <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column> -->
		<el-table-column prop="id" label="ID" header-align="center" align="center" width="100"></el-table-column>
		<el-table-column prop="title" label="标题" header-align="center" align="left"></el-table-column>
		<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
			<template #default="scope">
				<el-button type="primary" link @click="viewDetails(scope.row.id)">查看</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination
		:current-page="state.page"
		:page-sizes="state.pageSizes"
		:page-size="state.limit"
		:total="state.total"
		layout="total, sizes, prev, pager, next, jumper"
		@size-change="sizeChangeHandle"
		@current-change="currentChangeHandle"
	>
	</el-pagination>
	<Footer></Footer>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useCrud } from '@/hooks'
import { IHooksOptions } from '@/hooks/interface'

import Header from '@/layout/components/Header.vue'
import Footer from '@/layout/components/Footer.vue'

const state: IHooksOptions = reactive({
	dataListUrl: '/blog/post',
	deleteUrl: '/blog/post',
	queryForm: {
		order: 'create_time',
		asc: false
	}
})
const viewDetails = (id: any) => {
	const toPath = router.currentRoute.value.fullPath.indexOf('/site') === -1 ? '/postView' : '/site/post/postView'
	console.log(toPath)
	router.push({ path: toPath, query: { id: id } })
}

const { getDataList, sizeChangeHandle, selectionChangeHandle, sortChangeHandle, currentChangeHandle, deleteHandle, deleteBatchHandle } =
	useCrud(state)
</script>
