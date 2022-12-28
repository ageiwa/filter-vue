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
    @import './style.scss'
</style>