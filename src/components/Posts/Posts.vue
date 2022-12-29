<script setup>
    import { onMounted, ref, watch, reactive } from 'vue'
    import { sendRequest } from '@/requests/request.js'
    import { useTagsStore } from '@/stores/tagsStore.js';
    import { useSearchStore } from '@/stores/searchStore.js';
    import Post from '@/components/Post/Post.vue'
    
    const state = reactive({
        searchStore: useSearchStore(),
        activeTags: useTagsStore().state
    })
    
    const posts = ref([])

    onMounted(() => {
        sendRequest('server/posts.json').then(data => posts.value = data)
    })

    watch(state, () => {
        sendRequest('server/posts.json').then(data => {
            posts.value = filteredPosts(data)
        })
    })

    function filteredPosts(data) {
        const activeTags = state.activeTags.tags.map(item => item)
        const search = state.searchStore.search

        let posts = []
        let filtering = []

        if (state.activeTags.tags[0].id !== 0) {
            activeTags.forEach(tag => {

                filtering = data.filter(dataItem => {
                    if (dataItem.tag.indexOf(tag.id) !== -1) {
                        dataItem.tag = [true]
                        return true
                    }
                    else return false
                })

                posts.push(...filtering)
            })
        }
        else posts = data

        if (search !== '') return searchingPosts(posts)
        return posts
    }

    function searchingPosts(data) {
        const search = state.searchStore.search.toLowerCase()
        let filtering = []

        if (search === '') return data

        filtering = data.filter(dataItem => dataItem.name.toLowerCase().includes(search))

        return filtering
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