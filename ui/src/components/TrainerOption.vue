<template>
    <p class="traineroption" :data-state="state">
        <slot></slot>
    </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		text: {
			type: String,
		},
		sub: {
			type: String,
		},
		action: {
			type: String,
		},
		state: {
			type: String,
		},
		image: {
			type: String,
		},
	},
})
</script>

<style scoped>
</style>
