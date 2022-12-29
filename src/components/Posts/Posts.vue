<script setup>
    import { onMounted, ref, watch, reactive } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import { useTagsStore } from '../../stores/tagsStore.js';
    import { useSearchStore } from '../../stores/searchStore.js';
    import Post from '../Post/Post.vue'
    
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
        let save = []

        if (state.activeTags.tags[0].id !== 0) {
            activeTags.forEach(tag => {

            save = data.filter(dataItem => {
                let index = dataItem.tag.indexOf(tag.id)

                    if (index !== -1) {
                        dataItem.tag = [true]
                        return true
                    }
                    else return false
                })

                posts.push(...save)
            })
        }
        else posts = data

        if (search !== '') return searchingPosts(posts)
        return posts
    }

    function searchingPosts(data) {
        const search = state.searchStore.search
        let save = []

        if (search === '') return data

        save = data.filter(dataItem => dataItem.name.includes(search))

        return save
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