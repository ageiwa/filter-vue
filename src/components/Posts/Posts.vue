<script setup>
    import { onMounted, ref, watch, reactive } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import { useTagsStore } from '../../stores/tagsStore.js';
    import { useSearchStore } from '../../stores/searchStore.js';
    import Post from '../Post/Post.vue'

    const searchStore = useSearchStore()
    const state = reactive({
        activeTags: useTagsStore().state
    })
    
    const posts = ref([])
    const findsPosts = ref([])

    onMounted(() => {
        sendRequest('server/posts.json').then(data => posts.value = data)
    })

    watch(state.activeTags, () => {
        sendRequest('server/posts.json').then(data => {
            if (state.activeTags.tags[0].id === 0 && searchStore.search !== '') {
                findsPosts.value = searchingPosts(posts.value)
            }
            else if (state.activeTags.tags[0].id === 0) {
                posts.value = data
            }
            else if (searchStore.search !== '') findsPosts.value = filteredPosts(data)
            else posts.value = filteredPosts(data)
        })
    })

    function filteredPosts(data) {
        const activeTags = state.activeTags.tags.map(item => item)

        let posts = []
        let save = []

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

        if (searchStore.search !== '') return searchingPosts(posts)
        return posts
    }

    watch(searchStore, () => {
        findsPosts.value = searchingPosts(posts.value)
    })

    function searchingPosts(data) {
        const search = searchStore.search
        let save = []

        if (search === '') return data

        save = data.filter(dataItem => dataItem.name.includes(search))

        return save
    }

</script>

<template>
    <section class="posts">
        <Post
            v-if="searchStore.search !== ''"
            v-for="fpost in findsPosts"
            :name="fpost.name"
            :desc="fpost.desc"
        />

        <Post
            v-else
            v-for="post in posts"
            :name="post.name"
            :desc="post.desc"
        />
    </section>
</template>

<style scoped lang="scss">
    @import './style.scss'
</style>