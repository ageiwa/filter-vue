<script setup>
    const props = defineProps({
        name: String,
        desc: String
    })
</script>

<template>
    <article class="post">
        <h2 class="post__header">{{ name }}</h2>
        <p class="post__desc">{{ desc }}</p>
    </article>
</template>

<style scoped lang="scss">
    @import './style.scss'
</style>