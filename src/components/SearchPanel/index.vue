<script setup>
    import { ref } from 'vue';

    const search = ref('')
</script>

<template>
    <div class="search-panel">
        <input v-model="search" class="search-panel__input" type="text" placeholder="Начните вводить название">
    </div>
</template>

<style scoped lang="scss">
    .search-panel {
        padding: 10px;
        border: 1px solid #000;

        .search-panel__input {
            padding: 5px;
            width: 100%;
        }
    }
</style>
