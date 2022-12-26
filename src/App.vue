<script setup>
    import SearchPanel from './components/SearchPanel/index.vue'
</script>

<template>
    <div class="content">
        <SearchPanel />
        <section class="posts"></section>
    </div>
    <div class="tags"></div>
</template>

<style scoped>
    .posts {
        border: 1px solid #4f2b9d;
        padding: 10px;
    }

    .tags {
        border: 1px solid #9d2b2b;
    }
</style>
