<script setup>
    import SearchPanel from './components/SearchPanel/SearchPanel.vue'
    import Posts from './components/Posts/Posts.vue'
    import Tags from './components/Tags/Tags.vue'
</script>

<template>
    <div class="content">
        <SearchPanel />
        <Posts />
    </div>
    <Tags />
</template>