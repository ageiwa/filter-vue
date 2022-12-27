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
    <div :class="['tag', active]" @click="toggle">
        <p class="tag__title">{{ name }}</p>
        <div v-if="active" class="tag__btn">
            <img class="btn__icon" src="./cancel.svg" alt="close">
        </div>
    </div>
</template>

<style scoped lang="scss">
    .tag {
        margin: 5px;
        border: 1px solid #000;
        padding: 10px;
        display: flex;
        user-select: none;
        cursor: pointer;

        .tag__title {
            white-space: nowrap;
        }
    }

    .tag_active {
        background-color: #000;
        color: #fff;
    }

    .tag__btn {
        width: 18px;
        height: 18px;
        margin-left: 5px;
        border-radius: 50%;
        background-color: #fff;

        .btn__icon {
            width: 100%;
            height: 100%;
        }
    }
</style>