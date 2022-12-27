<script setup>
    import { ref } from 'vue'

    const emit = defineEmits(['toggle'])
    const props = defineProps({
        id: Number,
        name: String,
        active: Boolean
    })

    const isActive = ref(props.active)

    function toggle() {
        isActive.value = !isActive.value

        emit('toggle', {
            id: props.id,
            active: isActive.value
        })
    }
</script>

<template>
    <div :class="{'tag': true, 'tag_active': isActive}" @click="toggle">
        <p class="tag__title">{{ name }}</p>
        <div v-if="isActive" class="tag__btn">
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