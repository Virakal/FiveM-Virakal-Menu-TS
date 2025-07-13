<template>
    <div class="imagecontainer" v-if="img">
        <img :src="img">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: {
		img: {
			type: String,
		},
	},
})
</script>

<style scoped>
    .imagecontainer {
        opacity: 0.7;
        position: absolute;
        right: 25rem;
        top: 1.7rem;
        margin: 0;
        padding: 0;
    }

    img {
        border: 1px solid black;
        margin: 0;
        max-width: 20rem;
        padding: 0;
        width: 20rem;
    }
</style>
