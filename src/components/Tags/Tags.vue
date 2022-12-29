<script setup>
    import { onMounted, reactive } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import { useTagsStore } from '../../stores/tagsStore.js'
    import Tag from '../Tag/Tag.vue'

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
        let tags = state.tags.map((item) => item)
        let activeTags = state.activeTags.map((item) => item)

        tags[value.id].active = !tags[value.id].active

        activeTags.push(tags[value.id])
        activeTags = activeTags.filter((item) => {
            return value.id !== 0 ? item.id !== 0 && item.active : item.id === 0 && item.active
        })

        if (activeTags.length === 0) {
            tags[0].active = true
            activeTags.push(tags[0])
        }

        mergeTags(tags, activeTags)
    }

    function mergeTags(tags, activeTags) {
        tags = tags.map(item => {
            item = {id: item.id, name: item.name, active: false}
            return activeTags.find(itemActive => item.id === itemActive.id) || item
        })

        state.tags = tags
        state.activeTags = activeTags

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