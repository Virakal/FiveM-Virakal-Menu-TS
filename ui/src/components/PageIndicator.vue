<template>
    <p class="pageindicator">Page {{ page + 1 }} of {{ pageCount }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        page: {
            type: Number
        },
        pageCount: {
            type: Number
        }
    }
})

</script>

<style scoped>
    .pageindicator {
        color: white;
        font-size: 20px;
        text-align: center;
    }
</style>
