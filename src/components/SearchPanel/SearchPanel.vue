<script setup>
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
    @import './style.scss'
</style>
