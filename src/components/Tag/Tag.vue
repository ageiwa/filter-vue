<script setup>
    import { reactive } from 'vue'

    const emit = defineEmits(['toggle'])
    const props = defineProps({
        id: Number,
        name: String,
        active: Boolean
    })

    // const state = reactive({
    //     isActive: props.active
    // })

    function toggle() {
        // state.isActive = !state.isActive

        emit('toggle', {
            id: props.id,
            active: !props.active
        })
    }
</script>

<template>
    <div :class="{'tag': true, 'tag_active': props.active}" :id="props.id" @click="toggle">
        <p class="tag__title">{{ props.name }}</p>
        <div v-if="props.active" class="tag__btn">
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