<script setup>
    import { onMounted, ref, watch, reactive } from 'vue'
    import { sendRequest } from '../../requests/request.js'
    import { useTagsStore } from '../../stores/tagsStore';
    import Post from '../Post/Post.vue'

    const tagStore = reactive(useTagsStore().state)
    const posts = ref([])

    onMounted(() => {
        sendRequest('server/posts.json').then(data => posts.value = data)
    })

    watch(tagStore, () => {

        sendRequest('server/posts.json').then(data => {
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

            posts.value = filterPosts
        })

    })
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
    .posts {
        border: 1px solid #4f2b9d;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
</style>