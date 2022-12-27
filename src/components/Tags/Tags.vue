<script setup>
    import { onMounted, ref } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import Tag from '../Tag/Tag.vue'

    const tags = ref([])

    onMounted(() => {
        sendRequest('server/tags.json').then(data => {

            tags.value = data.map((item) => {
                return {
                    id: item.id, 
                    name: item.name,
                    active: false
                }
            })

            tags.value.unshift({id: 0, name: 'Все', active: true})
        })
    })

    // function toggleTag(value) {
    //     const selectedPosts = []

    //     tags.value.map((item) => {
    //         if (item.id === value.id) item.active = value.active
    //     })

    //     sendRequest('server/posts.json').then(data => {
    //         tags.value.forEach((itemI) => {
    //             if (itemI.active) {
    //                 const filterPosts = data.filter((itemJ) => itemI.id === itemJ.tag)
                    
    //                 selectedPosts.push(...filterPosts)
    //                 posts.value = selectedPosts
    //             }
    //         })
    //     })
    // }

</script>

<template>

    <div class="tags">
        <div class="container">

            <Tag
                v-for="tag in tags"
                :id="tag.id"
                :name="tag.name"
                :active="tag.active"
                
            />

        </div>
    </div>
    <!-- @toggle="toggleTag" -->

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