<script setup>
    import { onMounted, reactive } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import { useTagsStore } from '../../stores/tagsStore.js'
    import Tag from '../Tag/Tag.vue'

    const state = reactive({
        tags: []
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

            useTagsStore().change(state.tags)
        })
    })

    function toggleTag(value) {

        if (value.id === 0 && value.active) {
            state.tags[value.id].active = true

            state.tags.forEach((item) => {
                if (item.id !== value.id) item.active = false
            })
        }
        else if (value.active) {
            state.tags[0].active = false

            state.tags.forEach((item) => {
                if (item.id === value.id) item.active = true
            })
        }
        else {
            let counter = 0

            state.tags[value.id].active = false

            state.tags.forEach((item) => {
                if (!item.active) counter++
            })

            if (counter === state.tags.length) state.tags[0].active = true
        }
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
    .tags {
        border: 1px solid #9d2b2b;
        flex-wrap: wrap;

        .container {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>