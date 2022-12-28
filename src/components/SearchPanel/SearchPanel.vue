<script setup>
    import { ref } from 'vue'
    import { useSearchStore } from '../../stores/searchStore.js'

    const searchStore = useSearchStore()

    function onInput(e) {
        searchStore.change(e.target.value)
    }
</script>

<template>
    <div class="search-panel">
        <input @input="onInput" class="search-panel__input" type="text" placeholder="Начните вводить название">
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
