<script setup>
    import { onMounted, reactive } from 'vue'
    import { sendRequest } from '@/requests/request.js'
    import { useTagsStore } from '@/stores/tagsStore.js'
    import Tag from '@/components/Tag/Tag.vue'

    const state = reactive({
        tags: [],
        activeTags: []
    })

    onMounted(() => {
        sendRequest('server/tags.json').then(data => {
            state.tags = data.map((item) => {
                return {
                    id: item.id, 
                    name: item.name,
                    active: false
                }
            })

            state.tags.unshift({id: 0, name: 'Все', active: true})
            state.activeTags.unshift({id: 0, name: 'Все', active: true})

            useTagsStore().change(state.activeTags)
        })
    })

    function toggleTag(value) {
        state.tags[value.id].active = !state.tags[value.id].active

        state.activeTags.push(state.tags[value.id])
        state.activeTags = state.activeTags.filter((item) => {
            return value.id !== 0 ? item.id !== 0 && item.active : item.id === 0 && item.active
        })

        if (state.activeTags.length === 0) {
            state.tags[0].active = true
            state.activeTags.push(state.tags[0])
        }

        state.tags.forEach(tag => tag.active = false)

        state.activeTags.forEach(activeTag => {
            state.tags.find(tag => tag.id === activeTag.id).active = true
        })

        useTagsStore().change(state.activeTags)
    }

</script>

<template>

    <div class="tags">
        <div class="container">

            <Tag
                v-for="tag in state.tags"
                :id="tag.id"
                :name="tag.name"
                :active="tag.active"
                @toggle="toggleTag"
            />

        </div>
    </div>
    

</template>

<style scoped lang="scss">
    @import './style.scss'
</style>