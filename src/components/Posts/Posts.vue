<script setup>
    import { onMounted, ref, watch, reactive } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import { useTagsStore } from '../../stores/tagsStore.js';
    import { useSearchStore } from '../../stores/searchStore.js';
    import Post from '../Post/Post.vue'

    const searchStore = useSearchStore()
    const tagStore = reactive(useTagsStore().state)
    
    const posts = ref([])

    onMounted(() => {
        sendRequest('server/posts.json').then(data => posts.value = data)
    })

    watch(tagStore, () => {
        sendRequest('server/posts.json').then(data => {
            if (tagStore.tags[0].active) {
                posts.value = data
            }
            else posts.value = filteredPosts(data)
        })
    })

    watch(searchStore, () => {
        posts.value = searchingPosts(posts.value)
    })

    function searchingPosts(posts) {
        const searchingPosts = []

        posts.forEach((item) => {
            let counter = 0
            
            for (let i = 0; i < searchStore.search.length; i++) {
                if (item.name[i].toLowerCase() === searchStore.search[i].toLowerCase()) {
                    counter++
                }
                if (counter === searchStore.search.length) {
                    searchingPosts.push(item)
                }
            }
        })

        return removeSome(searchingPosts)
    }

    function filteredPosts(data) {
        const filterPosts = []

        tagStore.tags.forEach((itemI) => {
            if (itemI.active) {

                data.forEach((itemJ) => {
                    for (let i = 0; i < itemJ.tag.length; i++) {
                        if (itemI.id === itemJ.tag[i]) filterPosts.push(itemJ)
                    }
                })
            }
        })

        return removeSome(filterPosts)
    }

    function removeSome(filterPosts) {
        return [...new Set(filterPosts)]
    }
</script>

<template>
    <section class="posts">
        <Post
            v-for="post in posts"
            :name="post.name"
            :desc="post.desc"
        />
    </section>
</template>

<style scoped lang="scss">
    @import './style.scss'
</style>