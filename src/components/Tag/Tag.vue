<script setup>
    const emit = defineEmits(['toggle'])
    const props = defineProps({
        id: Number,
        name: String,
        active: Boolean
    })

    function toggle() {
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
    @import './style.scss'
</style>