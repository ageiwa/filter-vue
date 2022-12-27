<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        name: String
    })

    const active = ref('')

    function toggle() {
        active.value = active.value === 'tag_active' ? '' : 'tag_active'
    }
</script>

<template>
    <div :class="active" @click="toggle" class="tag">
        <p>{{ name }}</p>
    </div>
</template>

<style scoped lang="scss">
    .tag {
        margin: 5px;
        border: 1px solid #000;
        padding: 10px;
        user-select: none;
        cursor: pointer;
    }

    .tag_active {
        background-color: #000;
        color: #fff;
    }
</style>