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

        useTagsStore().change(state.tags)

        // sendRequest('server/posts.json').then(data => {
        //     tags.value.forEach((itemI) => {
        //         if (itemI.active) {
        //             const filterPosts = data.filter((itemJ) => itemI.id === itemJ.tag)
                    
        //             selectedPosts.push(...filterPosts)
        //             posts.value = selectedPosts
        //         }
        //     })
        // })
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