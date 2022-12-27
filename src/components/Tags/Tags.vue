<script setup>
    import { onMounted, reactive } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import { useTagsStore } from '../../stores/tagsStore.js'
    import Tag from '../Tag/Tag.vue'

    const state = reactive(useTagsStore().state)

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
        state.tags = state.tags.map((item) => {
            if (value.id === item.id) {
                return {id: item.id, name: item.name, active: value.active}
            }
            else {
                return {id: item.id, name: item.name, active: item.active}
            }
        })
            
        console.log(state.tags)

        useTagsStore().change(state.tags)
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
                :key="tag.active"
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