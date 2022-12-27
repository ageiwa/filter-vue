<script setup>
    const props = defineProps({
        name: String,
        desc: String
    })
</script>

<template>
    <article class="post">
        <h2>{{ name }}</h2>
        <p>{{ desc }}</p>
    </article>
</template>

<style scoped lang="scss">
    .post {
        border-radius: 5px;
        border: 1px solid #000;
        padding: 10px;
        height: 160px;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
    }
</style>