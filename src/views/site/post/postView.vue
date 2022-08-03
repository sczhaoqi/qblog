<template>
	<textarea id="editor-content-textarea" v-model="content" style="width: 100%; height: 100px; outline: none" readonly></textarea>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('<p>maku</p>')
</script>
